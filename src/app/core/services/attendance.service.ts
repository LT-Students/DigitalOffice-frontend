import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Time } from '@angular/common';

import { DatePeriod } from '@data/models/date-period';
import { DateService } from './date.service';
import { TimeService } from '@app/services/time/time.service';

@Injectable()
export class AttendanceService {
	private readonly _datePeriod = new BehaviorSubject<DatePeriod>(this._dateService.getDefaultDatePeriod());

	readonly datePeriod$ = this._datePeriod.asObservable();

	private readonly _recommendedTime = new BehaviorSubject<number>(this.getRecommendedTime(this.datePeriod));

	readonly recommendedTime$ = this._recommendedTime.asObservable();

	private readonly _activities = new BehaviorSubject<Time>(this.getRecommendedTime(this.datePeriod));

	readonly activities$ = this._activities.asObservable();

	get datePeriod(): DatePeriod {
		return this._datePeriod.getValue();
	}

	constructor(private _dateService: DateService, private _timeService: TimeService) {}

	public onDatePeriodChange(datePeriod: DatePeriod): void {
		const normalizedDatePeriod = this._dateService.normalizeDatePeriod(datePeriod);
		this._datePeriod.next(normalizedDatePeriod);
		if (normalizedDatePeriod.endDate) {
			this._recommendedTime.next(this.getRecommendedTime(normalizedDatePeriod));
		}
	}

	normalizeTime(time: any): string {
		const timeString = time.toString();
		return timeString.length === 1 ? '0' + timeString : timeString;
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
