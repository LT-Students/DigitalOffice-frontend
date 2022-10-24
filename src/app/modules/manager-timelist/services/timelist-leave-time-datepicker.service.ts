import { Injectable } from '@angular/core';
import { Interval } from 'luxon';
import { Holidays, LeaveTimeAndDatepickerManagement } from '@shared/modules/shared-time-tracking-system/models';

@Injectable()
export class TimelistLeaveTimeDatepickerService extends LeaveTimeAndDatepickerManagement {
	constructor() {
		super();
	}

	public setDatepickerHolidays(holidays: Holidays[]): void {
		this.datepickerHolidays = holidays;
	}

	public setRate(rate: number): void {
		this.rate = rate;
	}

	public setReservedDays(intervals: Interval[]): void {
		this.reservedLeaveIntervals = intervals;
	}
}
