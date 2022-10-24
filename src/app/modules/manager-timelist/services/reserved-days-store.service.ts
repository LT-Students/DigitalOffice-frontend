import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DateTime, Interval } from 'luxon';
import { LeaveTimeInfo } from '@api/time-service/models/leave-time-info';
import { TimeApiService } from './time-api.service';

@Injectable()
export class ReservedDaysStoreService {
	private reservedDaysStore = new Map<string, Interval[]>();

	constructor(private timeApi: TimeApiService) {}

	public loadUserReservedDays(userId: string): Observable<any> {
		if (this.reservedDaysStore.has(userId)) {
			return of(this.reservedDaysStore.get(userId));
		}
		return this.timeApi.findUserLeaveTimes(userId).pipe(
			map((leaveTimes: LeaveTimeInfo[]) => {
				return leaveTimes.map(({ startTime, endTime }: LeaveTimeInfo) => {
					const startDate = DateTime.fromISO(startTime as string);
					const endDate = DateTime.fromISO(endTime as string);
					return Interval.fromDateTimes(startDate, endDate.plus({ day: 1 }));
				});
			}),
			tap((intervals: Interval[]) => this.reservedDaysStore.set(userId, intervals))
		);
	}
}
