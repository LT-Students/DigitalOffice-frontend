import { Injectable } from '@angular/core';
import { DatePeriod } from '@app/types/date-period';
import { DateFilterFn } from '@angular/material/datepicker';
import { DateTime } from 'luxon';
import { DateService } from './date.service';

@Injectable({
	providedIn: 'root',
})
export class TimeDurationService {
	constructor(private _dateService: DateService) {}

	public countMaxMonthDuration(year: number, month: number): number {
		const currentDatePeriod: DatePeriod = {
			startDate: DateTime.local(year, month, 1),
			endDate: DateTime.local(year, month).endOf('month'),
		};
		return this.getDuration(currentDatePeriod, 24);
	}

	public getDuration(datePeriod: DatePeriod, hoursPerDay: number, dateFilter?: DateFilterFn<DateTime>): number {
		let startDate = datePeriod.startDate;
		const endDate = (datePeriod.endDate ? datePeriod.endDate : datePeriod.startDate).plus({ days: 1 });

		const days: DateTime[] = [];
		while (+startDate.startOf('day') !== +endDate.startOf('day')) {
			days.push(startDate);
			startDate = startDate.plus({ days: 1 });
		}
		return dateFilter ? days.filter(dateFilter).length * hoursPerDay : days.length * hoursPerDay;
	}
}
