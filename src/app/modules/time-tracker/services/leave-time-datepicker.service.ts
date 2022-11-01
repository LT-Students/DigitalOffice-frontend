import { Injectable } from '@angular/core';
import { Interval } from 'luxon';
import {
	Holidays,
	LeaveTimeAndDatepickerManagement as BaseService,
} from '@shared/modules/shared-time-tracking-system/models';
import { LeaveTime } from '../models';

@Injectable({
	providedIn: 'root',
})
export class LeaveTimeDatepickerService extends BaseService {
	constructor() {
		super();
	}

	public setDatepickerHolidays(holidays: Holidays[]): void {
		this.datepickerHolidays = holidays;
	}

	public setRate(rate: number): void {
		this.rate = rate;
	}

	public setReservedDays(leaves: LeaveTime[]): void {
		this.reservedLeaveIntervals = leaves.map((leave: LeaveTime) => {
			return Interval.fromDateTimes(leave.startTime, leave.endTime.plus({ day: 1 }));
		});
	}
}
