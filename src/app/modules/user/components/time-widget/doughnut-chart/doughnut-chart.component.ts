import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Activities, AttendanceService } from '@app/services/attendance.service';
import { TimeDurationService } from '@app/services/time-duration.service';

Chart.register(...registerables);

@Component({
	selector: 'do-doughnut-chart',
	templateUrl: './doughnut-chart.component.html',
	styleUrls: ['./doughnut-chart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoughnutChartComponent implements OnInit {
	@ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined;

	private _ctx: CanvasRenderingContext2D | null | undefined;
	private _chart: Chart<'doughnut'> | undefined;
	public activities: Activities | undefined;
	public labels: Array<string | undefined>;

	public monthNorm: number;
	public userHours: number;

	public readonly COLORS = [
		'#FFB2B2',
		'#C7C6D8',
		'#D2ECFF',
		'#FFBE97',
		'#FFD89E',
		'#9ABCDB',
		'#ABF5C0',
		'#FEECAA',
		'#FFCDCD',
	];
	private readonly EMPTY_COLOR = '#F5F5F5';

	constructor(
		private _attendanceService: AttendanceService,
		private _cdr: ChangeDetectorRef,
		private _timeDurationService: TimeDurationService
	) {
		this.monthNorm = 160;
		this.userHours = 0;
		this.labels = [];
	}

	ngOnInit(): void {
		this._ctx = this.canvas?.nativeElement.getContext('2d');
		this._chart = this._buildChart();

		this._attendanceService.activities$.subscribe({
			next: (activities) => {
				this.activities = activities;
				this.userHours = this._countUserHours();
				this.labels = this._getLabels();
				if (this._chart) {
					this._updateChart();
				}
				this._cdr.markForCheck();
			},
		});

		this._attendanceService.monthNorm$.subscribe({
			next: (monthNorm) => (this.monthNorm = monthNorm),
		});
	}

	private _countUserHours(): number {
		const projectHours: number =
			this.activities?.projects?.reduce((acc, project) => acc + (project?.userHours ?? 0), 0) ?? 0;
		const leavesHours: number =
			this.activities?.leaves
				?.filter((leave) => leave?.startTime && leave.startTime)
				.reduce(
					(acc, leave) =>
						acc +
						this._timeDurationService.getDuration({
							startDate: new Date(leave?.startTime as string),
							endDate: new Date(leave?.endTime as string),
						}),
					0
				) ?? 0;

		return projectHours + leavesHours;
	}

	private _getLabels(): Array<string | undefined> {
		const projectLabels = this.activities?.projects?.map((project) => project?.project?.name).filter(Boolean) ?? [];
		return this.activities?.leaves?.length && this.activities.leaves.length > 0
			? projectLabels?.concat('Отсутствия')
			: projectLabels;
	}

	private _updateChart(): void {
		const projectsHours =
			this.activities?.projects
				?.filter((project) => project?.userHours)
				.map((project) => project?.userHours as number) ?? [];
		const leavesHours =
			this.activities?.leaves
				?.filter((leave) => leave?.startTime && leave.endTime)
				.reduce(
					(acc, leave) =>
						acc +
						this._timeDurationService.getDuration({
							startDate: new Date(leave?.startTime as string),
							endDate: new Date(leave?.endTime as string),
						}),
					0
				) ?? 0;
		const timeLeft = projectsHours?.reduce((acc, activity) => acc - activity, this.monthNorm) - leavesHours;

		const colors = [...this.COLORS.slice(0, projectsHours?.length + (leavesHours ? 1 : 0)), this.EMPTY_COLOR];

		if (this._chart) {
			this._chart.data.datasets[0].data = [...projectsHours, leavesHours, timeLeft < 0 ? 0 : timeLeft];
			console.log(colors, this._chart.data.datasets[0].data);
			this._chart.data.datasets[0].backgroundColor = colors;
			this._chart.update();
		}
	}

	private _buildChart(): Chart<'doughnut'> {
		return new Chart(this._ctx ?? '', {
			type: 'doughnut',
			data: {
				datasets: [
					{
						data: [this.monthNorm],
						backgroundColor: [this.EMPTY_COLOR],
						borderWidth: 0,
					},
				],
			},
			options: {
				cutout: 65,
				responsive: false,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false,
					},
					tooltip: {
						backgroundColor: 'rgba(38, 50, 56, 1)',
						displayColors: false,
						xAlign: 'right',

						callbacks: {
							title: (tooltip: any) => tooltip[0].label,
							label: (tooltip: any) => `Количество часов: ${tooltip.formattedValue}`,
						},
					},
				},
			},
		});
	}
}
