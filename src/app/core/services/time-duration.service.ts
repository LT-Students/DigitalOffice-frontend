import { Injectable } from '@angular/core';
import { DatePeriod } from '@app/types/date-period';
import { DateTime } from 'luxon';

@Injectable({
	providedIn: 'root',
})
export class TimeDurationService {
	constructor() {}

	public countMaxMonthDuration(year: number, month: number): number {
		return TimeDuration.countMaxMonthDuration(year, month);
	}

	public getDuration(datePeriod: DatePeriod, hoursPerDay: number, dateFilter?: (date: DateTime) => boolean): number {
		return TimeDuration.getDuration(datePeriod, hoursPerDay, dateFilter);
	}
}

export class TimeDuration {
	constructor() {}

	public static countMaxMonthDuration(year: number, month: number): number {
		const currentDatePeriod: DatePeriod = {
			startDate: DateTime.local(year, month, 1),
			endDate: DateTime.local(year, month).endOf('month'),
		};
		return this.getDuration(currentDatePeriod, 24);
	}

	public static getDuration(
		{ startDate, endDate }: DatePeriod,
		hoursPerDay: number,
		dateFilter?: (date: DateTime) => boolean
	): number {
		endDate = (endDate ? endDate : startDate).plus({ days: 1 });

		const days: DateTime[] = [];
		while (+startDate.startOf('day') !== +endDate.startOf('day')) {
			days.push(startDate);
			startDate = startDate.plus({ days: 1 });
		}
		return (dateFilter ? days.filter(dateFilter).length : days.length) * hoursPerDay;
	}
}
