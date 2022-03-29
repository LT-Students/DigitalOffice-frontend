import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { Chart, registerables, TooltipItem } from 'chart.js';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WorkTimeInfo } from '@api/time-service/models/work-time-info';
import { LeaveTimeModel } from '@app/models/time/leave-time.model';
import { LeaveType } from '@api/time-service/models';
import { LeaveTypeModel } from '@app/models/time/leave-type.model';
import { isGUIDEmpty } from '@app/utils/utils';
import { Activities, AttendanceService } from '../../../services/attendance.service';

Chart.register(...registerables);

enum ChartLabels {
	RestProjects = 'Другие проекты',
	Leaves = 'Отсутствия',
	Other = 'Другое',
	Left = 'Запланированные часы',
}

export interface ChartData {
	colors: string[];
	labels: string[];
}

@Component({
	selector: 'do-doughnut-chart',
	templateUrl: './doughnut-chart.component.html',
	styleUrls: ['./doughnut-chart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoughnutChartComponent implements OnInit, OnDestroy {
	@ViewChild('canvas', { static: true }) canvas?: ElementRef<HTMLCanvasElement>;
	@Output() chartData = new EventEmitter<ChartData>();

	private readonly COLORS = ['#B9B7DE', '#FFB2B2', '#FFD89E', '#ABF5C0', '#9ECAE2', '#FFCDCD'];
	private readonly REST_PROJECTS_COLOR = '#FEECAA';
	private readonly LEAVES_COLOR = '#FFBE97';
	private readonly OTHER_COLOR = '#D2ECFF';
	private readonly EMPTY_COLOR = '#EBEBEB';

	public activities: Activities = {
		leaves: [],
		projects: [],
	};
	public labels: string[] = [];
	public monthNorm = 160;
	public userHours = 0;

	private chart?: Chart<'doughnut'>;
	private destroy$ = new Subject<void>();

	constructor(private attendanceService: AttendanceService, private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		const ctx = this.canvas?.nativeElement.getContext('2d');
		this.chart = this.buildChart(ctx);

		this.attendanceService.monthNorm$.pipe(takeUntil(this.destroy$)).subscribe({
			next: (monthNorm: number) => (this.monthNorm = monthNorm),
		});

		this.attendanceService.activities$.pipe(takeUntil(this.destroy$)).subscribe({
			next: (activities: Activities) => {
				this.activities = activities;
				this.userHours = this.countUserHours();
				this.labels = this.getLabels();
				this.updateChart();

				this.cdr.markForCheck();
			},
		});
	}

	private countUserHours(): number {
		const projectHours: number = this.activities.projects.reduce(
			(acc: number, project: WorkTimeInfo) => acc + (project?.userHours ?? 0),
			0
		);
		const leavesHours: number = this.activities.leaves.reduce(
			(acc: number, leave: LeaveTimeModel) => acc + leave.hours,
			0
		);

		return projectHours + leavesHours;
	}

	private getLabels(): string[] {
		//TODO remove type assertion when API is ready
		const projectLabels = [...this.activities.projects]
			.filter((workTime: WorkTimeInfo) => workTime?.userHours && !isGUIDEmpty(workTime?.project?.id as string))
			.sort((wt1: WorkTimeInfo, wt2: WorkTimeInfo) => (wt2.userHours as number) - (wt1.userHours as number))
			.map((project: WorkTimeInfo) => (project?.project?.shortName ?? project.project?.name) as string);
		const hasOtherWorkTime = this.activities.projects.some(
			(workTime: WorkTimeInfo) => isGUIDEmpty(workTime.project?.id as string) && workTime?.userHours
		);
		const labels = projectLabels.slice(0, 6);
		if (projectLabels.length > 6) {
			labels.push(ChartLabels.RestProjects);
		}
		if (hasOtherWorkTime) {
			labels.push(ChartLabels.Other);
		}
		if (this.activities.leaves.length) {
			labels.push(ChartLabels.Leaves);
		}
		if (this.monthNorm - this.userHours > 0 && labels.length) {
			labels.push(ChartLabels.Left);
		}

		return labels;
	}

	private updateChart(): void {
		if (!this.chart) return;

		const projectsHours = this.activities.projects
			.filter((project: WorkTimeInfo) => project?.userHours && !isGUIDEmpty(project.project?.id as string))
			.map((project: WorkTimeInfo) => project?.userHours as number)
			.sort((a: number, b: number) => b - a);
		const otherHours = this.activities.projects.find((workTime: WorkTimeInfo) =>
			isGUIDEmpty(workTime.project?.id as string)
		)?.userHours;
		const leavesHours = this.activities.leaves.reduce((acc: number, leave: LeaveTimeModel) => acc + leave.hours, 0);
		const timeLeft = this.monthNorm - this.userHours;

		const chartData = projectsHours.slice(0, 6);
		const colors = this.COLORS.slice(0, chartData.length);

		if (projectsHours.length > 6) {
			const restHours = projectsHours.slice(6).reduce((acc: number, hours: number) => acc + hours, 0);
			chartData.push(restHours);
			colors.push(this.REST_PROJECTS_COLOR);
		}
		if (otherHours) {
			chartData.push(otherHours);
			colors.push(this.OTHER_COLOR);
		}
		if (leavesHours) {
			chartData.push(leavesHours);
			colors.push(this.LEAVES_COLOR);
		}
		if (timeLeft > 0) {
			chartData.push(timeLeft);
			colors.push(this.EMPTY_COLOR);
		}

		this.chart.data.labels = this.labels;
		this.chart.data.datasets[0].data = chartData;
		this.chart.data.datasets[0].backgroundColor = colors;
		this.chart.data.datasets[0].hoverBackgroundColor = colors;
		this.chart.update();
		this.chartData.emit({ labels: this.labels, colors: colors });
	}

	private buildChart(context?: CanvasRenderingContext2D | null): Chart<'doughnut'> | undefined {
		if (!context) return;

		return new Chart(context, {
			type: 'doughnut',
			data: {
				labels: [ChartLabels.Left],
				datasets: [
					{
						data: [this.monthNorm],
						backgroundColor: [this.EMPTY_COLOR],
						borderWidth: 0,
						hoverOffset: () => (!!this.labels.length ? 10 : 0),
					},
				],
			},
			options: {
				cutout: 65,
				responsive: false,
				maintainAspectRatio: false,
				layout: {
					padding: {
						top: 10,
						bottom: 10,
					},
				},
				plugins: {
					legend: {
						display: false,
					},
					tooltip: {
						enabled: () => !!this.labels.length,
						backgroundColor: '#263238',
						boxWidth: 166,
						borderWidth: 166,
						cornerRadius: 8,
						caretSize: 8,
						padding: {
							top: 11,
							bottom: 11,
							left: 13,
							right: 13,
						},
						titleFont: {
							family: 'Montserrat',
							lineHeight: 1.5,
							size: 16,
							weight: '700',
						},
						bodyFont: {
							family: 'Lato',
							lineHeight: 1.45,
							size: 13,
							weight: '400',
						},
						displayColors: false,
						callbacks: {
							title: (tooltip: TooltipItem<'doughnut'>[]) => tooltip[0].label,
							label: (tooltip: TooltipItem<'doughnut'>) => {
								if (tooltip.label === ChartLabels.RestProjects) {
									return `Всего часов: ${tooltip.formattedValue} ч.`;
								}
								if (tooltip.label === ChartLabels.Left) {
									return `Осталось часов: ${tooltip.formattedValue} ч.`;
								}
								if (tooltip.label === ChartLabels.Leaves) {
									const leaves = [
										LeaveType.Vacation,
										LeaveType.Idle,
										LeaveType.SickLeave,
										LeaveType.Training,
									]
										.map((leaveType: LeaveType) => {
											const hours = this.activities.leaves
												.filter((l: LeaveTimeModel) => l.leaveType === leaveType)
												.reduce((acc: number, l: LeaveTimeModel) => acc + l.hours, 0);
											return hours
												? `${
														LeaveTypeModel.getLeaveInfoByLeaveType(leaveType)
															?.leaveInRussian
												  }: ${hours} ч.`
												: '';
										})
										.filter(Boolean);
									return [`Всего часов: ${tooltip.formattedValue} ч.`, ...leaves];
								}
								return `Количество часов: ${tooltip.formattedValue} ч.`;
							},
						},
					},
				},
			},
		});
	}

	public ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}