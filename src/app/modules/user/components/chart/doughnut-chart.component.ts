import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Time } from '@angular/common';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Chart } from 'chart.js';
import { AttendanceService } from '@app/services/attendance.service';
import { ProjectStore } from '@data/store/project.store';

import { MatDatepicker } from '@angular/material/datepicker';

import { D } from '@angular/cdk/keycodes';
import { Project } from '@data/models/project';

@Component({
	selector: 'do-doughnut-chart',
	templateUrl: './doughnut-chart.component.html',
	styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements OnInit, OnDestroy {
	@ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

	private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);
	private ctx: CanvasRenderingContext2D;
	private chart: Chart;

	public COLORS = ['#7C799B', '#C7C6D8', '#FFB2B2', '#FFB78C', '#EB5757', '#BC7BFA', '#FFBE97', '#BDBDBD'];
	public projects: Project[];
	public recommendedTime: Time;

	public datePeriod: any; //данные из date range picker
	//для перевода данных на русский
	public readonly rusMonth = {
		0: 'Январь',
		1: 'Февраль',
		2: 'Март',
		3: 'Апрель',
		4: 'Май',
		5: 'Июнь',
		6: 'Июль',
		7: 'Август',
		8: 'Сентябрь',
		9: 'Октябрь',
		10: 'Ноябрь',
		11: 'Декабрь',
	};
	public currentMonth: number; //выбранный текущий месяц
	public currentYear: number | string; //выбранный текущий год
	public firstRender = true; //при первоначальном открытии чтобы не было ошибки
	public startDate = new Date();

	constructor(private attendanceService: AttendanceService, private projectStore: ProjectStore) {}

	ngOnInit() {
		this.ctx = this.canvas.nativeElement.getContext('2d');

		this.attendanceService.recommendedTime$.pipe(takeUntil(this.onDestroy$)).subscribe((time) => {
			this.recommendedTime = time;
		});

		//отслеживаем date rage picker (по примеру функции выше)
		this.attendanceService.datePeriod$.pipe(takeUntil(this.onDestroy$)).subscribe((date) => {
			this.datePeriod = date;
		});

		this.projectStore.projects$.pipe(takeUntil(this.onDestroy$)).subscribe((projects) => {
			this.projects = projects;
			if (this.chart) {
				this.updateChart();
			}
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
		this.chart = new Chart(this.ctx, {
			type: 'doughnut',
			data: {
				datasets: [
					{
						data: this.isPeriodEmpty ? [1] : this.data,
						backgroundColor: this.isPeriodEmpty ? '#F1F1EF' : this.COLORS,
						borderWidth: 0,
					},
				],
			},
			options: {
				cutoutPercentage: 70,
				tooltips: {
					enabled: false,
				},
			},
		});
	}

	public abs(x: number): number {
		return Math.abs(x);
	}
	//когда еще не выбран месяц при запуске - месяц идет с текущей даты
	get month(): string {
		// приходит в формате "Jul" и преобр-ся к рус через объект rusMonth
		// если не выбран берет дату текущую
		if (this.firstRender) {
			this.currentMonth = this.startDate.getMonth();
			return this.rusMonth[this.currentMonth];
		}
		// если выбран месяц из datepicker, то currentMonth приходит из chosenMonthHandler
		return this.rusMonth[this.currentMonth];
	}

	get year(): number | string {
		if (this.firstRender) {
			this.currentYear = this.startDate.getFullYear();
			return this.currentYear;
		}
		// если выбран месяц из datepicker, то currentMonth приходит из chosenMonthHandler
		return this.currentYear;
	}

	//когда выбран месяц - firstRender становится false, в currentMonth попадает событие даты, которую выбрали
	chosenMonthHandler(chosenMonth: Date, datepicker: MatDatepicker<any>) {
		this.firstRender = false;
		datepicker.close();
		this.currentMonth = chosenMonth.getMonth();
		this.currentYear = chosenMonth.getFullYear();
		console.log(this.currentMonth);
	}

	public changeMonth(num: number) {
		this.currentMonth = this.startDate.getMonth(); //пришло событие текущей даты, getMonth вытащили месяц
		console.log(this.startDate);
		return this.startDate.setMonth(this.currentMonth + num); //уст-ка значения+-1 (параметр в шаблоне)
	}

	ngOnDestroy() {
		this.onDestroy$.next(null);
		this.onDestroy$.complete();
	}
}
