import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DateTime, Interval } from 'luxon';
import { DateFilterFn, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { LAST_DAY_TO_FILL_HOURS, MonthHolidays } from '../../time-tracker/services/attendance.service';

@Injectable()
export class ManagerTimelistService {
	private selectedDate = new BehaviorSubject(DateTime.now());
	public selectedDate$ = this.selectedDate.asObservable();

	private canEdit = new BehaviorSubject(this.canEditTime());
	public canEdit$ = this.canEdit.asObservable();

	private datepickerHolidays: MonthHolidays[] = [];
	private reservedLeaveIntervals: Interval[] = [];

	constructor() {}

	public setNewDate(date: DateTime): void {
		this.selectedDate.next(date);
		this.canEdit.next(this.canEditTime());
	}

	public getMinDate(): DateTime {
		const date = DateTime.now();
		return (date.day <= LAST_DAY_TO_FILL_HOURS ? date.minus({ month: 1 }) : date).startOf('month');
	}

	public disableReservedDays: DateFilterFn<DateTime> = (date: DateTime | null) => {
		const selectedDate = date || DateTime.now();
		return !this.reservedLeaveIntervals.some((interval: Interval) => interval.contains(selectedDate));
	};

	public filterWeekends(date: DateTime): boolean {
		const monthHolidays = this.datepickerHolidays.find(
			(m: MonthHolidays) => m.month === date.month && m.year === date.year
		);
		return monthHolidays
			? monthHolidays.holidays.every((isHoliday: boolean, day: number) =>
					isHoliday ? date.day !== day + 1 : true
			  )
			: date.weekday !== 6 && date.weekday !== 7;
	}

	public colorWeekends: MatCalendarCellClassFunction<DateTime> = (
		date: DateTime,
		view: 'month' | 'year' | 'multi-year'
	) => {
		return view === 'month' && this.filterWeekends(date) ? '' : 'datepicker-weekend';
	};

	private canEditTime(): boolean {
		const currentDate = DateTime.now();
		const selectedDate = this.selectedDate.value;
		return (
			currentDate.year < selectedDate.year ||
			(currentDate.year === selectedDate.year &&
				(currentDate.month <= selectedDate.month ||
					(currentDate.day <= LAST_DAY_TO_FILL_HOURS && currentDate.month === selectedDate.month + 1)))
		);
	}
}
