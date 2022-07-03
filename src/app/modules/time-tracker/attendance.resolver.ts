import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from '@app/services/current-user.service';
import { TimeService } from '@app/services/time/time.service';
import { DateTime } from 'luxon';
import { LeaveTimeResponse } from '@api/time-service/models/leave-time-response';
import { WorkTimeMonthLimitInfo } from '@api/time-service/models/work-time-month-limit-info';
import { WorkTimeResponse } from '@api/time-service/models/work-time-response';
import { LeaveTime } from './models/leave-time';
import { WorkTime } from './models/work-time';

@Injectable({
	providedIn: 'root',
})
export class AttendanceResolver implements Resolve<boolean> {
	constructor(private currentUser: CurrentUserService, private timeService: TimeService) {}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this.currentUser.user$.pipe(
			take(1),
			switchMap((user: User) =>
				forkJoin({
					reservedLeaveTimeIntervals: this.getReservedLeaveTimeIntervals(user.id),
					workTimes: this.getWorkTimes(user.id),
					monthNormAndHolidays: this.getMonthNormAndHolidays(),
				})
			)
		);
	}

	private getReservedLeaveTimeIntervals(userId: string): Observable<LeaveTime[]> {
		return this.timeService
			.findLeaveTimes({
				userid: userId,
				starttime: DateTime.now().startOf('month').setZone('UTC').toSQL(),
				skipCount: 0,
				takeCount: 30,
			})
			.pipe(
				map((res) =>
					(res.body as LeaveTimeResponse[]).map((lt: LeaveTimeResponse) => new LeaveTime(lt.leaveTime))
				)
			);
	}

	private getWorkTimes(userId: string): Observable<WorkTime[]> {
		const { month, year } = DateTime.now();
		return this.timeService
			.findWorkTimes({ userid: userId, month, year, skipCount: 0, takeCount: 30 })
			.pipe(map((res) => (res.body as WorkTimeResponse[]).map((wt: WorkTimeResponse) => new WorkTime(wt))));
	}

	private getMonthNormAndHolidays(): Observable<WorkTimeMonthLimitInfo[]> {
		const { month, year } = DateTime.now();
		return this.timeService
			.findWorkTimeMonthLimit({ month, year, skipCount: 0, takeCount: 1 })
			.pipe(map((res) => res.body as WorkTimeMonthLimitInfo[]));
	}
}
