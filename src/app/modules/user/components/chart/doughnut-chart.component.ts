import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { Chart, registerables } from 'chart.js';
import { Activities, AttendanceService } from '@app/services/attendance.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { UserService } from '@app/services/user/user.service';

Chart.register(...registerables);

@Component({
	selector: 'do-doughnut-chart',
	templateUrl: './doughnut-chart.component.html',
	styleUrls: ['./doughnut-chart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoughnutChartComponent implements OnInit, OnDestroy {
	@ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined;

	private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);
	private ctx: CanvasRenderingContext2D | null | undefined;
	private chart: Chart<'doughnut'> | undefined;

	public readonly COLORS = ['#FFB2B2', '#C7C6D8', '#D2ECFF', '#FFBE97', '#FFD89E', '#9ABCDB', '#ABF5C0', '#FEECAA', '#FFCDCD'];
	public readonly EMPTY_COLOR = '#F5F5F5';
	private _activities: Activities | undefined;
	private _userId: string | undefined;

	public currentDate: Date = new Date();

	public MONTH_NORM = 160;
	public userHours: BehaviorSubject<number>;

	constructor(private _attendanceService: AttendanceService, private _userService: UserService) {
		this.userHours = new BehaviorSubject<number>(0);
	}

	public ngOnInit() {
		this.ctx = this.canvas?.nativeElement.getContext('2d');
		this._userService.currentUser$
			.pipe(
				takeUntil(this.onDestroy$),
				tap((user) => (this._userId = user?.id)),
				switchMap(() => this._attendanceService.activities$)
			)
			.subscribe({
				next: (activities) => {
					const dateKey = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth());
					this._activities = activities.get(dateKey.getTime());
					this.userHours.next(this._countUserHours());
					if (this.chart) {
						this.updateChart();
					}
				},
			});

		this.chart = this.buildChart();
	}

	private _countUserHours(): number {
		const projectHours = this._activities?.projects?.reduce((acc, project) => acc + (project.userHours ?? 0), 0) ?? 0;
		const leavesHours =
			this._activities?.leaves?.reduce(
				(acc, leave) =>
					acc +
					this._attendanceService.getRecommendedTime({
						startDate: new Date(leave.startTime),
						endDate: new Date(leave.endTime),
					}),
				0
			) ?? 0;

		return projectHours + leavesHours;
	}

	private _getLabels(): Array<string | undefined> | undefined {
		const projectLabels = this._activities?.projects?.map((project) => project.project?.name).filter(Boolean);
		return this._activities?.leaves?.length && this._activities.leaves.length > 0 ? projectLabels?.concat('Отсутствия') : projectLabels;
	}

	private updateChart(): void {
		const labels = this._getLabels();
		const projectsHours = this._activities?.projects?.map((project) => project.userHours);
		const leavesHours = this._activities?.leaves?.reduce(
			(acc, leave) =>
				acc +
				this._attendanceService.getRecommendedTime({
					startDate: new Date(leave.startTime),
					endDate: new Date(leave.endTime),
				}),
			0
		);
		const timeLeft = projectsHours.reduce((acc, activity) => acc - activity, this.MONTH_NORM) - leavesHours;

		const colors = [...this.COLORS.slice(0, projectsHours.length + (leavesHours ? 1 : 0)), this.EMPTY_COLOR];

		this.chart.data.labels = labels;
		this.chart.data.datasets[0].data = [...projectsHours!, leavesHours, timeLeft < 0 ? 0 : timeLeft];
		this.chart.data.datasets[0].backgroundColor = colors;
		this.chart.update();
	}

	private buildChart(): Chart<'doughnut'> {
		return new Chart(this.ctx, {
			type: 'doughnut',
			data: {
				datasets: [
					{
						data: [this.MONTH_NORM],
						backgroundColor: [this.EMPTY_COLOR],
						borderWidth: 0,
					},
				],
			},
			options: {
				cutout: 65,
				responsive: false,
				plugins: {
					legend: {
						position: 'bottom',
						onClick: () => {},
						labels: {
							usePointStyle: true,
							pointStyle: 'circle',
						},
					},
					tooltip: {
						backgroundColor: 'rgba(38, 50, 56, 1)',
						displayColors: false,
						xAlign: 'right',

						callbacks: {
							title: (tooltip: any) => tooltip[0].label,
							label: (tooltip) => `Количество часов: ${tooltip.formattedValue}`,
						},
					},
				},
			},
		});
	}

	public chosenMonthHandler(chosenDate: Date, picker: MatDatepicker<any>): void {
		this.currentDate = chosenDate;
		picker.close();
		this._attendanceService.getActivities(this._userId, this.currentDate.getMonth(), this.currentDate.getFullYear()).pipe(take(1)).subscribe();
	}

	public changeMonth(changeDate: number): void {
		const currentMonth = this.currentDate.getMonth();
		const nextMonth = currentMonth + changeDate;
		this.currentDate = new Date(this.currentDate.setMonth(nextMonth));
		this._attendanceService.getActivities(this._userId, this.currentDate.getMonth(), this.currentDate.getFullYear()).pipe(take(1)).subscribe();
	}

	public onPreviousMonthClicked(): void {
		this.changeMonth(-1);
	}

	public onNextMonthClicked(): void {
		this.changeMonth(1);
	}

	public ngOnDestroy() {
		this.onDestroy$.next(null);
		this.onDestroy$.complete();
	}
}
