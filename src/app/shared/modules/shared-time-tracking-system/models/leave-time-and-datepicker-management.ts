import { DateFilterFn, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { DateTime, Interval } from 'luxon';
import { TimeDuration } from '@app/services/time-duration.service';
import { FULL_WORKDAY_LENGTH_IN_HOURS, Holidays } from '@shared/modules/shared-time-tracking-system/models';

export abstract class LeaveTimeAndDatepickerManagement {
	protected datepickerHolidays: Holidays[] = [];
	protected reservedLeaveIntervals: Interval[] = [];
	protected rate = 1;

	constructor() {}

	public abstract setDatepickerHolidays(...args: any[]): void;
	public abstract setReservedDays(...args: any[]): void;
	public abstract setRate(...args: any[]): void;

	public disableReservedDays: DateFilterFn<DateTime> = (date: DateTime | null) => {
		const selectedDate = date || DateTime.now();
		return !this.reservedLeaveIntervals.some((interval: Interval) => interval.contains(selectedDate));
	};

	public filterWeekends(date: DateTime): boolean {
		const monthHolidays = this.datepickerHolidays.find(
			(m: Holidays) => m.month === date.month && m.year === date.year
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

	public getLeaveDuration(startDate: DateTime, endDate: DateTime): number {
		const datePeriod = {
			startDate,
			endDate,
		};
		return TimeDuration.getDuration(
			datePeriod,
			FULL_WORKDAY_LENGTH_IN_HOURS * this.rate,
			this.filterWeekends.bind(this)
		);
	}
}
