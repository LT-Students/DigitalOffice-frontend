import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of, throwError } from 'rxjs';
import { auditTime, catchError, first, map, switchMap, tap } from 'rxjs/operators';
import { DateFilterFn, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { CreateWorkTimeRequest, LeaveType, WorkTimeMonthLimitInfo } from '@api/time-service/models';
import { DateTime, Interval } from 'luxon';
import { CurrentUserService } from '@app/services/current-user.service';
import { TimeDurationService } from '@app/services/time-duration.service';
import { User } from '@app/models/user/user.model';
import { isGUIDEmpty } from '@app/utils/utils';
import { EditRequest, LeaveTimePath, PatchDocument, WorkTimePath } from '@app/types/edit-request';
import { LeaveTime } from '../models/leave-time';
import { WorkTime } from '../models/work-time';
import { TimeService } from './time.service';

export interface Activities {
	workTimes: WorkTime[];
	leaves: LeaveTime[];
}

interface MonthHolidays {
	year: number;
	month: number;
	holidays: boolean[];
}

export interface SubmitWorkTimeValue {
	workTimeId: string;
	time: number;
	comment: string | null;
	initialValue?: WorkTime;
}

export interface SubmitLeaveTimeValue {
	leaveType: LeaveType;
	startTime: DateTime;
	endTime: DateTime;
	minutes: number;
	comment: string | null;
	leaveTimeId?: string;
}

const FULL_WORKDAY_LENGTH_IN_HOURS = 8;
export const LAST_DAY_TO_FILL_HOURS = 5;
export const MAX_FUTURE_DATE = DateTime.now().plus({ month: 1 }).endOf('month');

@Injectable()
export class AttendanceService {
	private readonly workTimes = new BehaviorSubject<WorkTime[]>([]);
	public readonly workTimes$ = this.workTimes.asObservable();

	private readonly leaveTimes = new BehaviorSubject<LeaveTime[]>([]);
	public readonly leaveTimes$ = this.leaveTimes.asObservable();

	private readonly selectedDate = new BehaviorSubject<DateTime>(DateTime.now());
	public readonly selectedDate$ = this.selectedDate.asObservable();

	private readonly monthNorm = new BehaviorSubject<number>(160);
	public readonly monthNorm$ = this.monthNorm.asObservable();

	private holidays: MonthHolidays = { month: 1, year: 0, holidays: [] };
	private reservedLeaveIntervals: Interval[] = [];

	private readonly canEdit = new BehaviorSubject<boolean>(this.canEditTime());
	public readonly canEdit$ = this.canEdit.asObservable();

	private rate = 0;

	public get activities$(): Observable<Activities> {
		return combineLatest([this.workTimes$, this.leaveTimes$]).pipe(
			auditTime(50),
			map(([workTimes, leaves]: [WorkTime[], LeaveTime[]]) => ({ workTimes, leaves }))
		);
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
		this.setRate();
		this.setWorkTimes(workTimes);
		this.setLeaveTimeIntervals(reservedLeaveTimeIntervals);

		const currentMonthInterval = Interval.fromDateTimes(
			DateTime.now().startOf('month'),
			DateTime.now().endOf('month')
		);
		const currentLeaveTimes = reservedLeaveTimeIntervals.filter(({ startTime, endTime }: LeaveTime) =>
			Interval.fromDateTimes(startTime, endTime).overlaps(currentMonthInterval)
		);
		this.setLeaveTimes(currentLeaveTimes);

		const monthLimit = monthNormAndHolidays[0];
		this.setMonthNormAndHolidays(monthLimit);
	}

	public submitWorkTime(value: SubmitWorkTimeValue): Observable<any> {
		const { workTimeId, time, comment } = value;
		let action: Observable<any>;
		if (isGUIDEmpty(workTimeId)) {
			action = this.selectedDate$.pipe(
				first(),
				switchMap(({ month, year, offset }: DateTime) => {
					const createRequest: CreateWorkTimeRequest = {
						month,
						year,
						offset: offset / 60,
						hours: time,
						description: comment || undefined,
					};
					return this.timeService.createWorkTime(createRequest);
				})
			);
		} else {
			const editRequest = this.getWorkTimeEditRequest(value);
			action = editRequest.length ? this.timeService.editWorkTime(workTimeId, editRequest) : of(null);
		}
		return action.pipe(switchMap((response) => (response ? this.getWorkTimes() : of(null))));
	}

	private getWorkTimeEditRequest(value: SubmitWorkTimeValue): EditRequest<WorkTimePath> {
		const initialValue = value.initialValue as WorkTime;
		const editRequest: EditRequest<WorkTimePath> = [];
		if (value.time !== initialValue.userHours) {
			editRequest.push(new PatchDocument(value.time, WorkTimePath.Hours));
		}
		if (value.comment !== initialValue.description) {
			editRequest.push(new PatchDocument(value.comment, WorkTimePath.Description));
		}
		return editRequest;
	}

	public getMonthActivities(): Observable<Activities> {
		return forkJoin({ workTimes: this.getWorkTimes(), leaves: this.getLeaveTimes() });
	}

	public getWorkTimes(): Observable<WorkTime[]> {
		return this.getSelectedDate$().pipe(
			switchMap((date: DateTime) => this.timeService.getWorkTimes(date)),
			tap(this.setWorkTimes.bind(this))
		);
	}

	public getLeaveTimes(): Observable<LeaveTime[]> {
		return this.getSelectedDate$().pipe(
			switchMap((date: DateTime) => this.timeService.getLeaveTimes(date)),
			tap(this.setLeaveTimes.bind(this))
		);
	}

	public submitLeaveTime(
		leaveValue: SubmitLeaveTimeValue,
		initialValue?: Required<SubmitLeaveTimeValue>
	): Observable<any> {
		let action: Observable<any>;
		if (initialValue) {
			const { leaveTimeId, ...compareValue } = initialValue;
			const editRequest = this.getLeaveTimeEditRequest(leaveValue, compareValue);
			action = this.timeService.editLeaveTime(leaveTimeId, editRequest);
		} else {
			action = this.timeService.createLeaveTime(leaveValue);
		}
		return action.pipe(switchMap(this.getLeaveTimes.bind(this)));
	}

	private getLeaveTimeEditRequest(
		newValue: SubmitLeaveTimeValue,
		compareValue: SubmitLeaveTimeValue
	): EditRequest<LeaveTimePath> {
		return Object.keys(newValue)
			.filter((key: string) => {
				const k = key as keyof SubmitLeaveTimeValue;
				const v1 = newValue[k];
				if (v1 instanceof DateTime) {
					const v2 = compareValue[k] as DateTime;
					return v1.day !== v2.day || v1.month === v2.month || v1.year === v2.year;
				}
				return newValue[k] !== compareValue[k];
			})
			.map(
				(key: string) =>
					new PatchDocument(
						newValue[key as keyof SubmitLeaveTimeValue],
						`/${key[0].toUpperCase() + key.slice(1)}` as LeaveTimePath
					)
			);
	}

	public deleteLeaveTime(id: string): Observable<any> {
		return this.leaveTimes$.pipe(
			first(),
			switchMap((lts: LeaveTime[]) => {
				const oldLts = lts;
				const newLts = lts.filter((lt: LeaveTime) => lt.id !== id);
				this.setLeaveTimes(newLts);
				return this.timeService.deleteLeaveTime(id).pipe(
					catchError((err) => {
						this.setLeaveTimes(oldLts);
						return throwError(err);
					})
				);
			})
		);
	}

	public getMonthNormAndHolidays(): Observable<any> {
		return this.selectedDate$.pipe(
			first(),
			switchMap((date: DateTime) => this.timeService.getMonthLimit(date)),
			tap((limit: WorkTimeMonthLimitInfo) => this.setMonthNormAndHolidays(limit))
		);
	}

	private setWorkTimes(workTimes: WorkTime[]): void {
		this.workTimes.next(workTimes);
	}

	private setLeaveTimes(leaveTimes: LeaveTime[]): void {
		this.leaveTimes.next(leaveTimes);
	}

	private setMonthNormAndHolidays({ normHours, holidays, month, year }: WorkTimeMonthLimitInfo): void {
		this.holidays = { month, year, holidays: holidays.split('').map(Number).map(Boolean) };
		this.monthNorm.next(normHours * this.rate);
	}

	private setRate(): void {
		this.currentUser.user$
			.pipe(
				first(),
				map((user: User) => user.company?.rate || 1)
			)
			.subscribe({ next: (rate: number) => (this.rate = rate) });
	}

	private setLeaveTimeIntervals(leaves: LeaveTime[]): void {
		this.reservedLeaveIntervals = leaves.map((leave: LeaveTime) => {
			return Interval.fromDateTimes(leave.startTime, leave.endTime.plus({ day: 1 }));
		});
	}

	private canEditTime(): boolean {
		const currentDate = DateTime.now();
		const selectedDate = this.selectedDate.value;
		return (
			currentDate.year < selectedDate.year ||
			(currentDate.year === selectedDate.year &&
				(currentDate.month <= selectedDate.month ||
					(currentDate.day <= LAST_DAY_TO_FILL_HOURS && currentDate.month === selectedDate.month + 1)))
		);
	}

	public setNewDate(date: DateTime): void {
		this.selectedDate.next(date);
		this.canEdit.next(this.canEditTime());
	}

	public disableReservedDays: DateFilterFn<DateTime> = (date: DateTime | null) => {
		const selectedDate = date || DateTime.now();
		return !this.reservedLeaveIntervals.some((interval: Interval) => interval.contains(selectedDate));
	};

	public filterWeekends(date: DateTime): boolean {
		const { month, year, holidays } = this.holidays;
		return date.month === month && date.year === year
			? holidays.every((isHoliday: boolean, day: number) => (isHoliday ? date.day !== day + 1 : true))
			: date.weekday !== 6 && date.weekday !== 7;
	}

	public colorWeekends: MatCalendarCellClassFunction<DateTime> = (
		date: DateTime,
		view: 'month' | 'year' | 'multi-year'
	) => {
		return view === 'month' && this.filterWeekends(date) ? '' : 'datepicker-weekend';
	};

	public getLeaveDuration(startDate: DateTime, endDate: DateTime): number {
		const datePeriod = {
			startDate,
			endDate,
		};
		return this.timeDurationService.getDuration(
			datePeriod,
			FULL_WORKDAY_LENGTH_IN_HOURS * this.rate,
			this.filterWeekends.bind(this)
		);
	}

	private getSelectedDate$(): Observable<DateTime> {
		return this.selectedDate$.pipe(first());
	}
}
