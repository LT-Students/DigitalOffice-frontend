import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, ReplaySubject } from 'rxjs';
import {
	ICreateLeaveTimeRequest,
	IEditWorkTimeRequest,
	IFindLeaveTimesRequest,
	IFindWorkTimeMonthLimitRequest,
	IFindWorkTimesRequest,
	TimeService,
} from '@app/services/time/time.service';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { WorkTimeInfo } from '@data/api/time-service/models/work-time-info';
import { UserService } from '@app/services/user/user.service';
import { DateFilterFn } from '@angular/material/datepicker';
import { OperationResultResponse } from '@data/api/time-service/models/operation-result-response';
import { LeaveTimeModel } from '@app/models/time/leave-time.model';
import { LeaveTimeInfo } from '@data/api/time-service/models';
import { DatePeriod } from '@app/types/date-period';
import { DateTime, Interval } from 'luxon';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CurrentUserService } from '@app/services/current-user.service';
import { DateService } from './date.service';
import { TimeDurationService } from './time-duration.service';

export interface Activities {
	projects?: Array<WorkTimeInfo>;
	leaves?: Array<LeaveTimeModel>;
}

interface MonthHolidays {
	month: number;
	holidays: boolean[];
}

@Injectable({
	providedIn: 'root',
})
export class AttendanceService implements Resolve<Activities> {
	private readonly _activities: ReplaySubject<Activities>;
	public readonly activities$: Observable<Activities>;

	private readonly _selectedDate: BehaviorSubject<DateTime>;
	public readonly selectedDate$: Observable<DateTime>;

	private readonly _monthNorm: BehaviorSubject<number>;
	public readonly monthNorm$: Observable<number>;

	private readonly _holidays: BehaviorSubject<MonthHolidays>;
	private readonly _leaveIntervals: BehaviorSubject<Interval[]>;

	private readonly _canEdit: BehaviorSubject<boolean>;
	public readonly canEdit$: Observable<boolean>;

	private _userId?: string;
	private _rate: number;

	constructor(
		private _dateService: DateService,
		private _timeService: TimeService,
		private _userService: UserService,
		private _timeDurationService: TimeDurationService,
		private _currentUserService: CurrentUserService
	) {
		this._selectedDate = new BehaviorSubject<DateTime>(DateTime.now());
		this.selectedDate$ = this._selectedDate.asObservable();

		this._activities = new ReplaySubject<Activities>(1);
		this.activities$ = this._activities.asObservable();

		this._canEdit = new BehaviorSubject<boolean>(this._canEditTime());
		this.canEdit$ = this._canEdit.asObservable();

		this._monthNorm = new BehaviorSubject<number>(160);
		this.monthNorm$ = this._monthNorm.asObservable();

		this._holidays = new BehaviorSubject<MonthHolidays>({ month: 1, holidays: [] });
		this._leaveIntervals = new BehaviorSubject<Interval[]>([]);

		this._rate = 1;
	}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Activities> {
		return this._currentUserService.user$.pipe(
			take(1),
			tap((user) => this.setUserIdAndRate(user?.rate, user?.id)),
			switchMap(() => this.getLeaveTimeIntervals()),
			switchMap(() => this.getMonthNormAndHolidays()),
			switchMap(() => this.getActivities())
		);
	}

	public getActivities(): Observable<Activities> {
		const date = this._selectedDate.value;

		const workTimesParams: IFindWorkTimesRequest = {
			userid: this._userId,
			skipCount: 0,
			takeCount: 10,
			month: date.month,
			year: date.year,
		};
		const leaveTimesParams: IFindLeaveTimesRequest = {
			userid: this._userId,
			skipCount: 0,
			takeCount: 10,
			starttime: date.startOf('month').toISO(),
			endtime: date.endOf('month').toISO(),
		};

		return forkJoin({
			projects: this._timeService
				.findWorkTimes(workTimesParams)
				.pipe(
					map((projects) =>
						projects.body
							?.map((project) => project.workTime)
							.filter((workTime): workTime is WorkTimeInfo => !!workTime)
					)
				),
			leaves: this._timeService.findLeaveTimes(leaveTimesParams).pipe(
				map((leaves) =>
					leaves.body
						?.map((res) => res.leaveTime)
						.filter((leave): leave is LeaveTimeInfo => !!leave)
						.map((leave) => new LeaveTimeModel(leave))
				)
			),
		}).pipe(tap((activities) => this._setActivities(activities)));
	}

	public editWorkTime(params: IEditWorkTimeRequest): Observable<OperationResultResponse> {
		return this._timeService.editWorkTime(params);
	}

	public addLeaveTime(params: Omit<ICreateLeaveTimeRequest, 'userId'>): Observable<OperationResultResponse> {
		const paramsWithId: ICreateLeaveTimeRequest = {
			...params,
			userId: this._userId ?? '',
		};
		return this._timeService.addLeaveTime(paramsWithId);
	}

	public getLeaveTimeIntervals() {
		const leaveTimesParams: IFindLeaveTimesRequest = {
			userid: this._userId,
			skipCount: 0,
			takeCount: 30,
			starttime: DateTime.now().minus({ months: 1 }).startOf('month').toISO(),
			endtime: DateTime.now().plus({ months: 1 }).endOf('month').toISO(),
		};
		return this._timeService.findLeaveTimes(leaveTimesParams).pipe(
			map((leaves) =>
				leaves.body
					?.map((res) => res.leaveTime)
					.filter((leave): leave is LeaveTimeInfo => !!leave)
					.map((leave) => new LeaveTimeModel(leave))
					.map((leave) =>
						Interval.fromISO(
							`${leave.startTime}/${DateTime.fromISO(leave.endTime).plus({ days: 1 }).toISO()}`
						)
					)
			),
			tap((intervals) => this._leaveIntervals.next(intervals ?? []))
		);
	}

	public getMonthNormAndHolidays(): Observable<any> {
		const month = this._selectedDate.value.month;
		const year = this._selectedDate.value.year;
		const params: IFindWorkTimeMonthLimitRequest = {
			month: month,
			year: year,
			skipCount: 0,
			takeCount: 1,
		};
		return this._timeService.findWorkTimeMonthLimit(params).pipe(
			map((response) => response.body?.[0]),
			tap((limit) => this._setMonthNormAndHolidays(limit?.normHours, limit?.holidays, limit?.month))
		);
	}

	private _setMonthNormAndHolidays(
		monthNorm: number | undefined,
		holidays: string | undefined,
		month?: number
	): void {
		if (monthNorm && holidays) {
			this._monthNorm.next(monthNorm * this._rate);
			this._holidays.next({ month: month ?? 1, holidays: holidays.split('').map(Number).map(Boolean) });
		}
	}

	private _setActivities(activities: Activities): void {
		this._activities.next(activities);
	}

	public setUserIdAndRate(rate: number, userId?: string): void {
		this._userId = userId;
		this._rate = rate;
	}

	private _canEditTime(): boolean {
		const currentDate = DateTime.now();
		const selectedDate = this._selectedDate.value;

		return (
			currentDate.year === selectedDate.year &&
			(currentDate.month === selectedDate.month ||
				(currentDate.day <= 5 && currentDate.month === selectedDate.month + 1))
		);
	}

	public setNewDate(date: DateTime): void {
		this._selectedDate.next(date);
		this._canEdit.next(this._canEditTime());
	}

	public disableWeekends: DateFilterFn<DateTime> = (d: DateTime | null): boolean => {
		const selectedDate = d || DateTime.now();
		const holidaysMonth = this._holidays.value.month;
		const holidays = this._holidays.value.holidays;

		return (
			(selectedDate.month === holidaysMonth
				? holidays.every((isHoliday, date) => (isHoliday ? selectedDate.day !== date + 1 : true))
				: selectedDate.weekday !== 6 && selectedDate.weekday !== 7) &&
			this._leaveIntervals.value.every((interval) => !interval.contains(selectedDate))
		);
	};

	public getCalendarMinMax(): [DateTime, DateTime] {
		const currentDate = DateTime.now();
		const minDate = currentDate.minus({ months: this._canEdit.value ? 1 : 0 }).startOf('month');
		const maxDate = currentDate.plus({ months: 1 }).endOf('month');

		return [minDate, maxDate];
	}

	public countMaxHours(): number {
		return this._timeDurationService.countMaxMonthDuration(
			this._selectedDate.value.year,
			this._selectedDate.value.month
		);
	}

	public getLeaveDuration(datePeriod: DatePeriod): number {
		return this._timeDurationService.getDuration(datePeriod, 8 * this._rate, this.disableWeekends);
	}
}
