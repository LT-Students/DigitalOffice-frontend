//@ts-nocheck
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Time } from '@angular/common';

import { DatePeriod } from '@data/models/date-period';
import { DateService } from './date.service';

@Injectable()
export class AttendanceService {
	private readonly _datePeriod = new BehaviorSubject<DatePeriod>(this.dateService.getDefaultDatePeriod(6));

	readonly datePeriod$ = this._datePeriod.asObservable();

	private readonly _recommendedTime = new BehaviorSubject<Time>(this.getRecommendedTime(this.datePeriod));

	readonly recommendedTime$ = this._recommendedTime.asObservable();

	get datePeriod(): DatePeriod {
		return this._datePeriod.getValue();
	}

	constructor(private dateService: DateService) {}

	public onDatePeriodChange(datePeriod: DatePeriod): void {
		const normalizedDatePeriod = this.dateService.normalizeDatePeriod(datePeriod);
		this._datePeriod.next(normalizedDatePeriod);
		if (normalizedDatePeriod.endDate) {
			this._recommendedTime.next(this.getRecommendedTime(normalizedDatePeriod));
		}
	}

	normalizeTime(time: any): string {
		const timeString = time.toString();
		return timeString.length === 1 ? '0' + timeString : timeString;
	}

	public getRecommendedTime(datePeriod: DatePeriod, hoursPerDay: number = 8, rate: number = 1): Time {
		const daysArray: Date[] = [];

		if (datePeriod.endDate && this.dateService.isSameDay(datePeriod.startDate, datePeriod.endDate)) {
			return { hours: hoursPerDay * rate, minutes: 0 };
		} else {
			const startDate = new Date(datePeriod.startDate);
			const endDate = new Date(datePeriod.endDate);

			while (startDate.getDate() !== endDate.getDate()) {
				daysArray.push(new Date(startDate));
				startDate.setDate(startDate.getDate() + 1);
			}
			const hours = (daysArray.filter((day: Date) => day.getDay() !== 6 && day.getDay() !== 0).length + 1) * hoursPerDay * rate;

			return { hours: hours, minutes: 0 };
		}
	}
}
