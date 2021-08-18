import { Component, ViewChild, ElementRef, OnDestroy, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Chart } from 'chart.js';
import { AttendanceService } from '@app/services/attendance.service';
import { ProjectStore } from '@data/store/project.store';
import { Project, ProjectModel } from '@app/models/project/project.model';
import { MatDatepicker } from '@angular/material/datepicker';
import { Time } from '@angular/common';

@Component({
	selector: 'do-doughnut-chart',
	templateUrl: './doughnut-chart.component.html',
	styleUrls: ['./doughnut-chart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoughnutChartComponent implements OnInit, OnDestroy {
	/* TODO: inject data from parent component in this list */
	@Input() projectList: Project[] | undefined;
	@ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined;

	private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);
	private ctx: CanvasRenderingContext2D | null | undefined;
	private chart: Chart<'doughnut'> | undefined;

	public COLORS = ['#7C799B', '#C7C6D8', '#FFB2B2', '#FFB78C', '#EB5757', '#BC7BFA', '#FFBE97', '#BDBDBD'];
	public projects: ProjectModel[];

	public recommendedTime: Time | undefined;

	public startDate: Date = new Date();

	constructor(private attendanceService: AttendanceService, private projectStore: ProjectStore) {
		this.projects = [];
	}

	public ngOnInit() {
		this.ctx = this.canvas?.nativeElement.getContext('2d');

		this.projectStore.projects$.pipe(takeUntil(this.onDestroy$)).subscribe((projects) => {
			this.projects = projects;
			if (this.chart) {
				this.updateChart();
			}
		});

		this.ctx = this.canvas?.nativeElement.getContext('2d');

		this.attendanceService.recommendedTime$.pipe(takeUntil(this.onDestroy$)).subscribe((time) => {
			this.recommendedTime = time;
		});

		this.buildChart();
	}

	public get spentTime(): Time {
		return {
			hours: Math.floor(this.spentMinutes / 60),
			minutes: this.spentMinutes % 60,
		};
	}

	public get remainingTime(): Time {
		const minutes = this.remainingMinutes % 60;
		const hours = this.remainingMinutes ? Math.floor(this.remainingMinutes / 60) : Math.ceil(this.remainingMinutes / 60);
		return {
			hours,
			minutes,
		};
	}

	public get isPeriodEmpty(): boolean {
		return !this.data.some((minutes: number) => minutes > 0);
	}

	private get data(): number[] {
		return this.projects.map((project) => project.tasks.reduce((sum, task) => sum + task.minutes, 0));
	}

	private get spentMinutes() {
		return this.data.reduce((sum, projectMinutes) => sum + projectMinutes, 0);
	}

	private get remainingMinutes() {
		const recommendedMinutes = this.recommendedTime.hours * 60 + this.recommendedTime.minutes;
		return recommendedMinutes - this.spentMinutes;
	}

	private updateChart(): void {
		this.chart.data.datasets[0].data = this.data;
		this.chart.data.datasets[0].backgroundColor = this.COLORS;
		this.chart.update();
	}

	private buildChart() {
		const projectsLabels = this.projects.map(({ name }) => name);

		this.chart = new Chart(this.ctx, {
			type: 'doughnut',
			data: {
				labels: projectsLabels,
				datasets: [
					{
						data: this.isPeriodEmpty ? [1] : this.data,
						backgroundColor: this.isPeriodEmpty ? '#F1F1EF' : this.COLORS,
						borderWidth: 0,
					},
				],
			},
			options: {
				// cutout: 70,
				aspectRatio: 1,
				plugins: {
					legend: {
						position: 'bottom',
						onClick: undefined,
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

						// callbacks: {
						// 	title: (tooltip: any) => {
						// 		console.log(tooltip.dataset);
						// 	},
						// 	label: (tooltip: any) => {
						// 		console.log(tooltip.label);
						// 	},
						// 	footer: (tooltip: any) => {
						// 		console.log(tooltip.footer);
						// 	},
						// },
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
