import { Component, OnInit, OnDestroy } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AttendanceService } from '@app/services/attendance.service';
import { DayOfWeek } from '@data/models/day-of-week';
import { DateService } from '@app/services/date.service';

@Component({
	selector: 'do-datedesc',
	templateUrl: './date-desc.component.html',
	styleUrls: ['./date-desc.component.scss'],
})
export class DateDescComponent implements OnInit, OnDestroy {
	private tempStartDate: Date;

	private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);

	public startDate: Date | null;
	public endDate: Date | null;
	public daysOfWeek: DayOfWeek[];

	constructor(public attendanceService: AttendanceService, private dateAdapter: DateAdapter<Date>, public dateService: DateService) {}

	ngOnInit(): void {
		this.attendanceService.datePeriod$.pipe(takeUntil(this.onDestroy$)).subscribe((datePeriod) => {
			this.startDate = datePeriod.startDate;
			this.endDate = datePeriod.endDate;
			if (this.endDate) {
				this.daysOfWeek = this.dateService.getWeek(this.endDate);
			}
		});

		this.startDate = this.attendanceService.datePeriod.startDate;
		this.endDate = this.attendanceService.datePeriod.endDate;
		this.daysOfWeek = this.dateService.getWeek(this.endDate);

		this.dateAdapter.setLocale('ru');
		this.dateAdapter.getFirstDayOfWeek = () => 1;
	}

	public disableWeekends = (d: Date | null): boolean => {
		const day = (d || new Date()).getDay();
		return day !== 0 && day !== 6;
	};

	public selectDay(dayOfWeek): void {
		this.daysOfWeek = this.dateService.getWeek(dayOfWeek.date);
		this.attendanceService.onDatePeriodChange({
			startDate: dayOfWeek.date,
			endDate: dayOfWeek.date,
		});
	}

	public onClose(): void {
		const datePeriod = this.attendanceService.datePeriod;
		if (!datePeriod.endDate) {
			const oneDayPeriod = {
				startDate: datePeriod.startDate,
				endDate: datePeriod.startDate,
			};
			this.attendanceService.onDatePeriodChange(oneDayPeriod);
		}
	}

	public onDateInput(date: Date | null, isStartDate: boolean) {
		if (date) {
			if (isStartDate) {
				this.attendanceService.onDatePeriodChange({
					startDate: date,
					endDate: null,
				});
				this.daysOfWeek = this.dateService.getWeek(date);
				this.tempStartDate = date;
			} else {
				this.attendanceService.onDatePeriodChange({
					startDate: this.tempStartDate,
					endDate: date,
				});
			}
		}
	}

	public getPeriod(): string {
		return `выбранный период: ${this.startDate.toDateString()} - ${this.endDate.toDateString()}`;
	}

	ngOnDestroy(): void {
		this.onDestroy$.next(null);
		this.onDestroy$.complete();
	}
}
