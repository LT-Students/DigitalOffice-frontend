import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import { Chart, registerables } from 'chart.js';
import { Activities, AttendanceService } from '@app/services/attendance.service';
import { ProjectStore } from '@data/store/project.store';
import { ProjectModel } from '@app/models/project/project.model';
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
	public projects: ProjectModel[];
	private _activities: Activities | undefined;
	private _userId: string | undefined;

	public startDate: Date = new Date();

	public MONTH_NORM = 160;
	public userHours: BehaviorSubject<number>;

	constructor(private _attendanceService: AttendanceService, private _userService: UserService, private projectStore: ProjectStore) {
		this.projects = [];
		this.userHours = new BehaviorSubject<number>(0);
	}

	public ngOnInit() {
		this.ctx = this.canvas?.nativeElement.getContext('2d');
		this._userService.currentUser$
			.pipe(
				takeUntil(this.onDestroy$),
				tap((user) => (this._userId = user?.id)),
				switchMap(() => this._attendanceService.getActivities(this._userId))
			)
			.subscribe({
				next: (response) => {
					this._activities = response;
					console.log(this._activities);
					this.userHours.next(this._countUserHours());
					if (this.chart) {
						this.updateChart();
					}
				},
			});

		this.chart = this.buildChart();

		this.projectStore.projects$.pipe(takeUntil(this.onDestroy$)).subscribe((projects) => {
			this.projects = projects;
			if (this.chart) {
				this.updateChart();
			}
		});
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

	private get data(): number[] {
		return this.projects.map((project) => project.tasks.reduce((sum, task) => sum + Math.floor(task.minutes / 60), 0));
	}

	private updateChart(): void {
		const timeLeft = this.data.reduce((acc, activity) => acc - activity, this.MONTH_NORM);
		const colors = [...this.COLORS.splice(0, this.data.length), this.EMPTY_COLOR];

		this.chart.data.labels = this.projects.map(({ name }) => name);
		this.chart.data.datasets[0].data = [...this.data, timeLeft];
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
						// yAlign: 'bottom',

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
		this.startDate = chosenDate;
		picker.close();
	}

	public changeMonth(changeDate: number): void {
		const currentMonth = this.startDate.getMonth();
		const nextMonth = currentMonth + changeDate;
		this.startDate = new Date(this.startDate.setMonth(nextMonth));
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
