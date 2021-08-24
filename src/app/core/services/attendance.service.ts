import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';

import { DatePeriod } from '@data/models/date-period';
import { IFindLeaveTimesRequest, IFindWorkTimesRequest, TimeService } from '@app/services/time/time.service';
import { map, tap } from 'rxjs/operators';
import { LeaveTimeInfo } from '@data/api/time-service/models/leave-time-info';
import { WorkTimeInfo } from '@data/api/time-service/models/work-time-info';
import { UserService } from '@app/services/user/user.service';
import { DateService } from './date.service';

export interface Activities {
	projects?: WorkTimeInfo[];
	leaves?: LeaveTimeInfo[];
}

@Injectable({
	providedIn: 'root',
})
export class AttendanceService {
	private readonly _recommendedTime = new BehaviorSubject<number>(this.getRecommendedTime(this._dateService.getDefaultDatePeriod()));
	public readonly recommendedTime$ = this._recommendedTime.asObservable();

	private readonly _activities = new BehaviorSubject<Activities>({});
	public readonly activities = this._activities.asObservable();

	private _currentDate: Date;

	constructor(private _dateService: DateService, private _timeService: TimeService, private _userService: UserService) {
		this._currentDate = new Date();
	}

	public getActivities(
		userId: string | undefined,
		month = this._currentDate.getMonth(),
		year = this._currentDate.getFullYear(),
	): Observable<Activities> {
		const workTimesParams: IFindWorkTimesRequest = {
			userid: userId,
			skipCount: 0,
			takeCount: 10,
			month: month + 1,
			year: year,
		};
		const leaveTimesParams: IFindLeaveTimesRequest = {
			userid: userId,
			skipCount: 0,
			takeCount: 10,
			starttime: new Date(year, month, 1).toISOString(),
			endtime: new Date(year, month + 1, 0).toISOString(),
		};
		return forkJoin({
			projects: this._timeService.findWorkTimes(workTimesParams).pipe(map((projects) => projects.body)),
			leaves: this._timeService.findLeaveTimes(leaveTimesParams).pipe(map((leaves) => leaves.body)),
		}).pipe(tap((activities) => this._setActivities(activities)));
	}

	private _setActivities(activities: Activities): void {
		this._activities.next(activities);
	}

	public getRecommendedTime(datePeriod: DatePeriod, hoursPerDay: number = 8, skipHolidays = false, rate: number = 1): number {
		const daysArray: Date[] = [];

		if (datePeriod.endDate && this._dateService.isSameDay(datePeriod.startDate, datePeriod.endDate)) {
			return hoursPerDay * rate;
		} else {
			const startDate = new Date(datePeriod.startDate as Date);
			const endDate = new Date(datePeriod.endDate as Date);

			while (startDate.getDate() !== endDate.getDate()) {
				daysArray.push(new Date(startDate));
				startDate.setDate(startDate.getDate() + 1);
			}

			if (skipHolidays) {
				return (daysArray.filter((day: Date) => day.getDay() !== 6 && day.getDay() !== 0).length + 1) * hoursPerDay * rate;
			} else {
				return (daysArray.length + 1) * hoursPerDay * rate;
			}
		}
	}
}
