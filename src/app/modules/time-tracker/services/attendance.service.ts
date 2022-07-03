import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, ReplaySubject } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { DateFilterFn, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { CreateWorkTimeRequest, WorkTimeMonthLimitInfo } from '@api/time-service/models';
import { DatePeriod } from '@app/types/date-period';
import { DateTime, Interval } from 'luxon';
import { CurrentUserService } from '@app/services/current-user.service';
import { TimeDurationService } from '@app/services/time-duration.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { EditRequest, WorkTimePath } from '@app/types/edit-request';
import { User } from '@app/models/user/user.model';
import { LeaveTime } from '../models/leave-time';
import { WorkTime } from '../models/work-time';
import { AddLeaveValue } from '../components/add-hours/add-leave-hours/add-leave-hours.component';
import { TimeService } from './time.service';

export interface Activities {
	workTimes: WorkTime[];
	leaves: LeaveTime[];
}

interface MonthHolidays {
	month: number;
	holidays: boolean[];
}

const FULL_WORKDAY_LENGTH_IN_HOURS = 8;
const LAST_DAY_TO_FILL_HOURS = 5;

@Injectable()
export class AttendanceService {
	private readonly workTimes = new ReplaySubject<WorkTime[]>(1);
	public readonly workTimes$ = this.workTimes.asObservable();

	private readonly leaveTimes = new ReplaySubject<LeaveTime[]>(1);
	public readonly leaveTimes$ = this.leaveTimes.asObservable();

	private readonly selectedDate = new BehaviorSubject<DateTime>(DateTime.now());
	public readonly selectedDate$ = this.selectedDate.asObservable();

	private readonly monthNorm = new BehaviorSubject<number>(160);
	public readonly monthNorm$ = this.monthNorm.asObservable();

	private holidays: MonthHolidays = { month: 1, holidays: [] };
	private reservedLeaveIntervals: Interval[] = [];

	private readonly canEdit = new BehaviorSubject<boolean>(this.canEditTime());
	public readonly canEdit$ = this.canEdit.asObservable();

	public get activities$(): Observable<Activities> {
		return forkJoin({ workTimes: this.workTimes$, leaves: this.leaveTimes$ });
	}

	constructor(
		private timeService: TimeService,
		private timeDurationService: TimeDurationService,
		private currentUser: CurrentUserService
	) {}

	public setInitialData({
		reservedLeaveTimeIntervals,
		workTimes,
		monthNormAndHolidays,
	}: {
		reservedLeaveTimeIntervals: LeaveTime[];
		workTimes: WorkTime[];
		monthNormAndHolidays: WorkTimeMonthLimitInfo[];
	}): void {
		this.workTimes.next(workTimes);
		this.setLeaveTimeIntervals(reservedLeaveTimeIntervals);

		const { normHours, holidays, month } = monthNormAndHolidays[0];
		this.setMonthNormAndHolidays(normHours, holidays, month);
	}

	public getMonthActivities(): Observable<Activities> {
		return forkJoin({ workTimes: this.getWorkTimes(), leaves: this.getLeaveTimes() });
	}

	public getWorkTimes(): Observable<WorkTime[]> {
		return this.selectedDate$.pipe(
			first(),
			switchMap((date: DateTime) => this.timeService.getWorkTimes(date))
		);
	}

	public getLeaveTimes(): Observable<LeaveTime[]> {
		return this.selectedDate$.pipe(
			first(),
			switchMap((date: DateTime) => this.timeService.getLeaveTimes(date))
		);
	}

	public editWorkTime(id: string, editRequest: EditRequest<WorkTimePath>): Observable<OperationResultResponse> {
		return this.timeService.editWorkTime(id, editRequest);
	}

	public createWorkTime(body: CreateWorkTimeRequest): Observable<OperationResultResponse> {
		return this.timeService.createWorkTime(body);
	}

	public addLeaveTime(value: AddLeaveValue): Observable<OperationResultResponse> {
		return this.timeService.createLeaveTime(value);
	}

	public deleteLeaveTime(id: string): Observable<any> {
		return this.timeService.deleteLeaveTime(id);
	}

	public getMonthNormAndHolidays(): Observable<any> {
		return this.selectedDate$.pipe(
			first(),
			switchMap((date: DateTime) => this.timeService.getMonthLimit(date)),
			tap((limit) => this.setMonthNormAndHolidays(limit.normHours, limit.holidays, limit?.month))
		);
	}

	private setMonthNormAndHolidays(monthNorm: number, holidays: string, month = 1): void {
		this.holidays = { month, holidays: holidays.split('').map(Number).map(Boolean) };
		this.getUserRate().subscribe({
			next: (rate: number) => {
				this.monthNorm.next(monthNorm * rate);
			},
		});
	}

	public setLeaveTimeIntervals(leaves: LeaveTime[]): void {
		this.reservedLeaveIntervals = leaves.map((leave: LeaveTime) => {
			return Interval.fromDateTimes(
				DateTime.fromISO(leave.startTime),
				DateTime.fromISO(leave.endTime).plus({ day: 1 })
			);
		});
	}

	private canEditTime(): boolean {
		const currentDate = DateTime.now();
		const selectedDate = this.selectedDate.value;
		return (
			currentDate.year === selectedDate.year &&
			(currentDate.month === selectedDate.month ||
				(currentDate.day <= LAST_DAY_TO_FILL_HOURS && currentDate.month === selectedDate.month + 1))
		);
	}

	public setNewDate(date: DateTime): void {
		this.selectedDate.next(date);
		this.canEdit.next(this.canEditTime());
	}

	public removeInterval(dateInterval: Interval): void {
		const leaveIntervals = [...this.reservedLeaveIntervals];
		const newIntervals = leaveIntervals.filter((interval) => !interval.equals(dateInterval));
		this.reservedLeaveIntervals = [...newIntervals];
	}

	public disableWeekends: DateFilterFn<DateTime> = (date: DateTime | null) => {
		const selectedDate = date || DateTime.now();
		return this.reservedLeaveIntervals.every((interval: Interval) => !interval.contains(selectedDate));
	};

	public colorWeekends: MatCalendarCellClassFunction<DateTime> = (
		date: DateTime,
		view: 'month' | 'year' | 'multi-year'
	) => {
		const { month, holidays } = this.holidays;
		return view === 'month' &&
			(date.month === month
				? holidays.every((isHoliday: boolean, day: number) => (isHoliday ? date.day !== day + 1 : true))
				: date.weekday !== 6 && date.weekday !== 7)
			? ''
			: 'datepicker-weekend';
	};

	public getLeaveDuration(datePeriod: DatePeriod): Observable<number> {
		return this.getUserRate().pipe(
			map((rate: number) =>
				this.timeDurationService.getDuration(
					datePeriod,
					FULL_WORKDAY_LENGTH_IN_HOURS * rate,
					this.disableWeekends
				)
			)
		);
	}

	private getUserRate(): Observable<number> {
		return this.currentUser.user$.pipe(
			first(),
			map((user: User) => user.company?.rate || 1)
		);
	}
}
