import { Injectable } from '@angular/core';
import { DateFilterFn, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { DateTime, Interval } from 'luxon';
import { CurrentUserService } from '@app/services/current-user.service';
import { TimeDurationService } from '@app/services/time-duration.service';
import { WorkTimeMonthLimitInfo } from '@api/time-service/models/work-time-month-limit-info';
import {
	FULL_WORKDAY_LENGTH_IN_HOURS,
	LAST_DAY_TO_FILL_HOURS,
	MonthHolidays,
	SubmitLeaveTimeValue,
} from '../../time-tracker/services/attendance.service';
import { LeaveTime } from '../../time-tracker/models/leave-time';
import { TimeService } from '../services/time.service';

@Injectable({
	providedIn: 'root',
})
export class AddLeaveTimeDialogService {
	private datepickerHolidays: MonthHolidays[] = [];
	private reservedLeaveIntervals: Interval[] = [];
	private rate = 1;
	private userId = '';

	constructor(
		private timeService: TimeService,
		private currentUser: CurrentUserService,
		private timeDurationService: TimeDurationService
	) {}

	public setInitialData(
		reservedDays: LeaveTime[],
		holidays: (WorkTimeMonthLimitInfo | null)[],
		rate: number,
		userId: string
	): void {
		this.reservedLeaveIntervals = this.setLeaveTimeIntervals(reservedDays);
		this.rate = rate;
		this.userId = userId;
		this.datepickerHolidays = this.setDatepickerHolidays(holidays);
	}

	private setLeaveTimeIntervals(leaves: LeaveTime[]): Interval[] {
		return leaves.map((leave: LeaveTime) => {
			return Interval.fromDateTimes(leave.startTime, leave.endTime.plus({ day: 1 }));
		});
	}

	private setDatepickerHolidays(holidays: (WorkTimeMonthLimitInfo | null)[]): MonthHolidays[] {
		return holidays.map((l: WorkTimeMonthLimitInfo | null) => ({
			month: l?.month || 0,
			year: l?.year || 0,
			holidays: l ? l.holidays.split('').map(Number).map(Boolean) : [],
		}));
	}

	public disableReservedDays: DateFilterFn<DateTime> = (date: DateTime | null) => {
		const selectedDate = date || DateTime.now();
		return !this.reservedLeaveIntervals.some((interval: Interval) => interval.contains(selectedDate));
	};

	public filterWeekends(date: DateTime): boolean {
		const monthHolidays = this.datepickerHolidays.find(
			(m: MonthHolidays) => m.month === date.month && m.year === date.year
		);
		return monthHolidays
			? monthHolidays.holidays.every((isHoliday: boolean, day: number) =>
					isHoliday ? date.day !== day + 1 : true
			  )
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

	public submitLeaveTime(leaveValue: SubmitLeaveTimeValue): Observable<any> {
		return this.timeService.addLeaveTime(this.userId, leaveValue);
	}

	public getMinDate(): DateTime {
		const date = DateTime.now();
		return (date.day <= LAST_DAY_TO_FILL_HOURS ? date.minus({ month: 1 }) : date).startOf('month');
	}
}
