import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { auditTime, map } from 'rxjs/operators';
import { DateTime, Interval } from 'luxon';
import { LeaveTime, WorkTime } from '../models';

export interface Activities {
	workTimes: WorkTime[];
	leaveTimes: LeaveTime[];
}

@Injectable({
	providedIn: 'root',
})
export class AttendanceStoreService {
	private readonly workTimes = new BehaviorSubject<WorkTime[]>([]);
	public readonly workTimes$ = this.workTimes.asObservable();

	private readonly leaveTimes = new BehaviorSubject<LeaveTime[]>([]);
	public readonly leaveTimes$ = this.leaveTimes.asObservable();

	public get activities$(): Observable<Activities> {
		return combineLatest([this.workTimes$, this.leaveTimes$]).pipe(
			auditTime(50),
			map(([workTimes, leaveTimes]: [WorkTime[], LeaveTime[]]) => ({ workTimes, leaveTimes }))
		);
	}

	constructor() {}

	public setInitialData({ leaveTimes, workTimes }: Activities) {
		this.setWorkTimes(workTimes);

		/**
		 * On page load it resolves leave times data for 3 month to disable these ranges in datepicker. And in store we
		 * have only leave times for current month, so we need only those, that intersects with current month.
		 */
		const currentLeaveTimes = this.getLeaveTimesIntersectingCurrentMonth(leaveTimes);
		this.setLeaveTimes(currentLeaveTimes);
	}

	public setWorkTimes(workTimes: WorkTime[]): void {
		this.workTimes.next(workTimes);
	}

	public setLeaveTimes(leaveTimes: LeaveTime[]): void {
		this.leaveTimes.next(leaveTimes);
	}

	private getLeaveTimesIntersectingCurrentMonth(leaveTimes: LeaveTime[]): LeaveTime[] {
		const currentMonthInterval = Interval.fromDateTimes(
			DateTime.now().startOf('month'),
			DateTime.now().endOf('month')
		);
		return leaveTimes.filter(({ startTime, endTime }: LeaveTime) =>
			Interval.fromDateTimes(startTime, endTime).overlaps(currentMonthInterval)
		);
	}
}
