//@ts-nocheck
import { Component, ViewChild, ElementRef, OnDestroy, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Time } from '@angular/common';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Chart } from 'chart.js';
import { AttendanceService } from '@app/services/attendance.service';
import { ProjectStore } from '@data/store/project.store';
import { Project, ProjectModel } from '@app/models/project/project.model';
import { MatDatepicker } from '@angular/material/datepicker';
import { Data } from '@angular/router';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
	selector: 'do-doughnut-chart',
	templateUrl: './doughnut-chart.component.html',
	styleUrls: ['./doughnut-chart.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoughnutChartComponent implements OnInit, OnDestroy {
	/* TODO: inject data from parent component in this list */
	@Input() projectList: Project[] | null;
	@ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

	private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);
	private ctx: CanvasRenderingContext2D;
	private chart: Chart;

	public COLORS = ['#7C799B', '#C7C6D8', '#FFB2B2', '#FFB78C', '#EB5757', '#BC7BFA', '#FFBE97', '#BDBDBD'];
	public projects: ProjectModel[];
	public projectsLabels: string[];

	public recommendedTime: Time;

	public startDate: Date = new Date();

	constructor(private attendanceService: AttendanceService, private projectStore: ProjectStore) {}

	ngOnInit() {
		this.ctx = this.canvas.nativeElement.getContext('2d'); //приводит к созданию объекта

		this.attendanceService.recommendedTime$.pipe(takeUntil(this.onDestroy$)).subscribe((time) => {
			this.recommendedTime = time;
		});

		this.projectStore.projects$.pipe(takeUntil(this.onDestroy$)).subscribe((projects) => {
			this.projects = projects;
			if (this.chart) {
				this.updateChart();
			}
		});

		this.ctx = this.canvas.nativeElement.getContext('2d');

		this.attendanceService.recommendedTime$.pipe(takeUntil(this.onDestroy$)).subscribe((time) => {
			this.recommendedTime = time;
		});

		this.buildChart();
	}

	get spentTime() {
		return {
			hours: Math.floor(this.spentMinutes / 60),
			minutes: this.spentMinutes % 60,
		};
	}

	get remainingTime() {
		const minutes = this.remainingMinutes % 60;
		const hours = this.remainingMinutes ? Math.floor(this.remainingMinutes / 60) : Math.ceil(this.remainingMinutes / 60);
		return {
			hours,
			minutes,
		};
	}

	get remainingTimeStatus(): string {
		if (this.remainingMinutes > 0) {
			return 'positive';
		} else if (this.remainingMinutes < 0) {
			return 'negative';
		} else {
			return 'zero';
		}
	}

	get isPeriodEmpty() {
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
		this.projectsLabels = this.projects.map(({ name }) => name);

		this.chart = new Chart(this.ctx, {
			type: 'doughnut',
			data: {
				labels: this.projectsLabels,

				datasets: [
					{
						data: this.isPeriodEmpty ? [1] : this.data,
						backgroundColor: this.isPeriodEmpty ? '#F1F1EF' : this.COLORS,
						borderWidth: 0,
						radius: 500,
					},
				],
			},
			options: {
				cutoutPercentage: 70,
				legend: {
					position: 'bottom',
					labels: {
						usePointStyle: true,
						pointStyle: 'circle',
						title: {
							position: 'start',
						},
					},
				},
				tooltips: {
					enabled: false,
				},
			},
		});
	}

	public chosenMonthHandler(chosenDate: Date, picker: MatDatepicker<any>): void {
		this.startDate = chosenDate;
		picker.close();
	}
	public changeMonth(changeDate: number) {
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

	ngOnDestroy() {
		this.onDestroy$.next(null);
		this.onDestroy$.complete();
	}
}
