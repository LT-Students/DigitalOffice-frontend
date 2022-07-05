import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { DateFilterFn, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { CreateWorkTimeRequest, LeaveType, WorkTimeMonthLimitInfo } from '@api/time-service/models';
import { DatePeriod } from '@app/types/date-period';
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

	private holidays: MonthHolidays = { month: 1, holidays: [] };
	private reservedLeaveIntervals: Interval[] = [];

	private readonly canEdit = new BehaviorSubject<boolean>(this.canEditTime());
	public readonly canEdit$ = this.canEdit.asObservable();

	public get activities$(): Observable<Activities> {
		return combineLatest([this.workTimes$, this.leaveTimes$]).pipe(
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
		this.setWorkTimes(workTimes);
		this.setLeaveTimeIntervals(reservedLeaveTimeIntervals);
		this.leaveTimes.next(reservedLeaveTimeIntervals);

		const monthLimit = monthNormAndHolidays[0];
		this.setMonthNormAndHolidays(monthLimit);
	}

	public submitWorkTime(value: SubmitWorkTimeValue): Observable<any> {
		const { workTimeId, time, comment } = value;
		if (isGUIDEmpty(workTimeId)) {
			return this.selectedDate$.pipe(
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
			return editRequest.length ? this.timeService.editWorkTime(workTimeId, editRequest) : of(true);
		}
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

	public submitLeaveTime(
		leaveValue: SubmitLeaveTimeValue,
		initialValue?: Required<SubmitLeaveTimeValue>
	): Observable<any> {
		if (initialValue) {
			const { leaveTimeId, ...compareValue } = initialValue;
			const editRequest = this.getLeaveTimeEditRequest(leaveValue, compareValue);
			return this.timeService.editLeaveTime(leaveTimeId, editRequest);
		}
		return this.timeService.createLeaveTime(leaveValue);
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
		return this.timeService.deleteLeaveTime(id);
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

	private setMonthNormAndHolidays({ normHours, holidays, month }: WorkTimeMonthLimitInfo): void {
		this.holidays = { month, holidays: holidays.split('').map(Number).map(Boolean) };
		this.getUserRate().subscribe({
			next: (rate: number) => {
				this.monthNorm.next(normHours * rate);
			},
		});
	}

	private setLeaveTimeIntervals(leaves: LeaveTime[]): void {
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

	public disableReservedDays: DateFilterFn<DateTime> = (date: DateTime | null) => {
		const selectedDate = date || DateTime.now();
		return !this.reservedLeaveIntervals.some((interval: Interval) => interval.contains(selectedDate));
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

	public getLeaveDuration(datePeriod: DatePeriod, disableReservedDays: DateFilterFn<DateTime>): Observable<number> {
		return this.getUserRate().pipe(
			map((rate: number) =>
				this.timeDurationService.getDuration(
					datePeriod,
					FULL_WORKDAY_LENGTH_IN_HOURS * rate,
					disableReservedDays
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
