import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Chart, registerables } from 'chart.js';
import { AttendanceService } from '@app/services/attendance.service';
import { ProjectStore } from '@data/store/project.store';
import { Project, ProjectModel } from '@app/models/project/project.model';
import { MatDatepicker } from '@angular/material/datepicker';
import { Time } from '@angular/common';

Chart.register(...registerables);

@Component({
	selector: 'do-doughnut-chart',
	templateUrl: './doughnut-chart.component.html',
	styleUrls: [ './doughnut-chart.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoughnutChartComponent implements OnInit, OnDestroy {
	/* TODO: inject data from parent component in this list */
	@Input() projectList: Project[] | undefined;
	@ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined;

	private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);
	private ctx: CanvasRenderingContext2D | null | undefined;
	private chart: Chart<'doughnut'> | undefined;

	public readonly COLORS = [ '#FFB2B2', '#C7C6D8', '#D2ECFF', '#FFBE97', '#FFD89E', '#9ABCDB', '#ABF5C0', '#FEECAA', '#FFCDCD' ];
	public readonly EMPTY_COLOR = '#F5F5F5';
	public projects: ProjectModel[];

	public recommendedTime: Time | undefined;

	public startDate: Date = new Date();

	public MONTH_NORM = 160;
	public userHours: number;

	constructor(private attendanceService: AttendanceService, private projectStore: ProjectStore) {
		this.projects = [];
		this.userHours = 0;
	}

	public ngOnInit() {
		this.ctx = this.canvas?.nativeElement.getContext('2d');

		this.attendanceService.recommendedTime$.pipe(takeUntil(this.onDestroy$)).subscribe((time) => {
			this.recommendedTime = time;
		});

		this.buildChart();

		this.projectStore.projects$.pipe(takeUntil(this.onDestroy$)).subscribe((projects) => {
			this.projects = projects;
			this.userHours = this.projects.reduce((acc, project) => acc + project.tasks[0].minutes, 0);
			if (this.chart) {
				this.updateChart();
			}
		});
	}

	private get data(): number[] {
		return this.projects.map((project) => project.tasks.reduce((sum, task) => sum + Math.floor(task.minutes / 60), 0));
	}

	private updateChart(): void {
		const timeLeft = this.data.reduce((acc, activity) => acc - activity, this.MONTH_NORM);
		const colors = [ ...this.COLORS.splice(0, this.data.length), this.EMPTY_COLOR ];

		this.chart.data.labels = this.projects.map(({ name }) => name);
		this.chart.data.datasets[0].data = [ ...this.data, timeLeft ];
		this.chart.data.datasets[0].backgroundColor = colors;
		this.chart.update();
	}

	private buildChart() {
		this.chart = new Chart(this.ctx, {
			type: 'doughnut',
			data: {
				datasets: [
					{
						data: [ this.MONTH_NORM ],
						backgroundColor: [ this.EMPTY_COLOR ],
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
						onClick: () => {
						},
						labels: {
							usePointStyle: true,
							pointStyle: 'circle',
						},
					},
					tooltip: {
						backgroundColor: 'rgba(38, 50, 56, 1)',
						displayColors: false,
						xAlign: 'right',
						yAlign: 'bottom',

						callbacks: {
							title: (tooltip: any) => tooltip[0].label,
							label: (tooltip) => `Количество часов: ${ tooltip.formattedValue }`,
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
