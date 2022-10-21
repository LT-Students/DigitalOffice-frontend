import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { LeaveTimeResponse, WorkTimeMonthLimitInfo, WorkTimeResponse } from '@api/time-service/models';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from '@app/services/current-user.service';
import { TimeService } from '@app/services/time/time.service';
import { Holidays, HolidaysFactory } from '@shared/modules/shared-time-tracking-system/models';
import { LeaveTime, WorkTime } from './models';

export interface AttendanceResolvedData {
	leaveTimes: LeaveTime[];
	workTimes: WorkTime[];
	holidays: Holidays[];
	monthNorm: number;
}

@Injectable({
	providedIn: 'root',
})
export class AttendanceResolver implements Resolve<AttendanceResolvedData> {
	constructor(private currentUser: CurrentUserService, private timeService: TimeService) {}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AttendanceResolvedData> {
		return this.currentUser.user$.pipe(
			take(1),
			switchMap((user: User) =>
				forkJoin({
					leaveTimes: this.getReservedLeaveTimeIntervals(user.id),
					workTimes: this.getWorkTimes(user.id),
					monthNormAndHolidays: this.getMonthNormAndHolidays(),
				})
			),
			map((data) => ({
				leaveTimes: data.leaveTimes,
				workTimes: data.workTimes,
				holidays: data.monthNormAndHolidays.holidays,
				monthNorm: data.monthNormAndHolidays.monthNorm,
			}))
		);
	}

	private getReservedLeaveTimeIntervals(userId: string): Observable<LeaveTime[]> {
		const date = DateTime.now();
		return this.timeService
			.findLeaveTimes({
				userid: userId,
				starttime: date.minus({ month: 1 }).startOf('month').toSQL(),
				endtime: date.plus({ month: 1 }).endOf('month').toSQL(),
				skipCount: 0,
				takeCount: 30,
			})
			.pipe(map((res) => (res.body || []).map((lt: LeaveTimeResponse) => new LeaveTime(lt.leaveTime))));
	}

	private getWorkTimes(userId: string): Observable<WorkTime[]> {
		const { month, year } = DateTime.now();
		return this.timeService
			.findWorkTimes({ userid: userId, month, year, skipCount: 0, takeCount: 30 })
			.pipe(map((res) => (res.body || []).map((wt: WorkTimeResponse) => new WorkTime(wt))));
	}

	private getMonthNormAndHolidays(): Observable<{ holidays: Holidays[]; monthNorm: number }> {
		const date = DateTime.now();
		return forkJoin([
			this.findMonthLimit(date),
			this.findMonthLimit(date.minus({ month: 1 })),
			this.findMonthLimit(date.plus({ month: 1 })),
		]).pipe(
			map((limits: (WorkTimeMonthLimitInfo | null)[]) => {
				const monthNorm = limits[0]?.normHours || 160;
				const holidays = limits.map((l) => HolidaysFactory.create(l));
				return { monthNorm, holidays };
			})
		);
	}

	private findMonthLimit({ month, year }: DateTime): Observable<WorkTimeMonthLimitInfo | null> {
		return this.timeService
			.findWorkTimeMonthLimit({ month, year, skipCount: 0, takeCount: 1 })
			.pipe(map((res) => (res.body as WorkTimeMonthLimitInfo[])[0]));
	}
}
