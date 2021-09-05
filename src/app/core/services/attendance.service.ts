import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, ReplaySubject } from 'rxjs';

import { DatePeriod } from '@data/models/date-period';
import { IEditWorkTimeRequest, IFindLeaveTimesRequest, IFindWorkTimesRequest, TimeService } from '@app/services/time/time.service';
import { map, tap } from 'rxjs/operators';
import { LeaveTimeInfo } from '@data/api/time-service/models/leave-time-info';
import { WorkTimeInfo } from '@data/api/time-service/models/work-time-info';
import { UserService } from '@app/services/user/user.service';
import { DateFilterFn } from '@angular/material/datepicker';
import { CreateLeaveTimeRequest } from '@data/api/time-service/models/create-leave-time-request';
import { OperationResultResponse } from '@data/api/time-service/models/operation-result-response';
import { DateService } from './date.service';

export interface Activities {
	projects?: Array<WorkTimeInfo | undefined>;
	leaves?: Array<LeaveTimeInfo | undefined>;
}

@Injectable({
	providedIn: 'root',
})
export class AttendanceService {
	private readonly _activities: ReplaySubject<Activities>;
	public readonly activities$: Observable<Activities>;

	private readonly _selectedDate: BehaviorSubject<Date>;
	public readonly selectedDate$: Observable<Date>;

	private readonly _monthNorm: BehaviorSubject<number>;
	public readonly monthNorm$: Observable<number>;

	private readonly _canEdit: BehaviorSubject<boolean>;
	public readonly canEdit$: Observable<boolean>;

	private _userId: string | undefined;

	constructor(private _dateService: DateService, private _timeService: TimeService, private _userService: UserService) {
		this._selectedDate = new BehaviorSubject<Date>(new Date());
		this.selectedDate$ = this._selectedDate.asObservable();

		this._activities = new ReplaySubject<Activities>(1);
		this.activities$ = this._activities.asObservable();

		this._canEdit = new BehaviorSubject<boolean>(this._canEditTime());
		this.canEdit$ = this._canEdit.asObservable();

		this._monthNorm = new BehaviorSubject<number>(160);
		this.monthNorm$ = this._monthNorm.asObservable();
	}

	public getActivities(): Observable<Activities> {
		const month = this._selectedDate.value.getMonth();
		const year = this._selectedDate.value.getFullYear();

		const workTimesParams: IFindWorkTimesRequest = {
			userid: this._userId,
			skipCount: 0,
			takeCount: 10,
			month: month + 1,
			year: year,
		};
		const leaveTimesParams: IFindLeaveTimesRequest = {
			userid: this._userId,
			skipCount: 0,
			takeCount: 10,
			starttime: new Date(year, month, 1).toISOString(),
			endtime: new Date(year, month + 1, 0).toISOString(),
		};

		return forkJoin({
			projects: this._timeService.findWorkTimes(workTimesParams).pipe(map((projects) => projects.body?.map((project) => project.workTime))),
			leaves: this._timeService.findLeaveTimes(leaveTimesParams).pipe(map((leaves) => leaves.body?.map((leave) => leave.leaveTime))),
		}).pipe(tap((activities) => this._setActivities(activities)));
	}

	public editWorkTime(params: IEditWorkTimeRequest): Observable<OperationResultResponse> {
		return this._timeService.editWorkTime(params);
	}

	public addLeaveTime(params: Omit<CreateLeaveTimeRequest, 'userId'>): Observable<OperationResultResponse> {
		const paramsWithId: CreateLeaveTimeRequest = {
			...params,
			userId: this._userId ?? '',
		};
		return this._timeService.addLeaveTime(paramsWithId);
	}

	private _setActivities(activities: Activities): void {
		this._activities.next(activities);
	}

	public setUserId(userId: string | undefined): void {
		this._userId = userId;
	}

	private _canEditTime(): boolean {
		const currentDate = new Date();
		const selectedDate = this._selectedDate.value;

		return (
			currentDate.getFullYear() === selectedDate.getFullYear() &&
			(currentDate.getMonth() === selectedDate.getMonth() ||
				(currentDate.getDate() <= 5 && currentDate.getMonth() === selectedDate.getMonth() + 1))
		);
	}

	public setNewDate(date: Date): void {
		this._selectedDate.next(date);
		this._canEdit.next(this._canEditTime());
	}

	public disableWeekends: DateFilterFn<Date> = (d: Date | null): boolean => {
		const day = (d || new Date()).getDay();
		return day !== 0 && day !== 6;
	};

	public countMaxHours(): number {
		const currentDatePeriod: DatePeriod = {
			startDate: new Date(this._selectedDate.value.getFullYear(), this._selectedDate.value.getMonth(), 1),
			endDate: new Date(this._selectedDate.value.getFullYear(), this._selectedDate.value.getMonth() + 1, 0),
		};
		return Number(this.getRecommendedTime(currentDatePeriod, 24));
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
