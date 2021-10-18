import { Injectable } from '@angular/core';
import { DatePeriod } from '@app/types/date-period';
import { DayOfWeek } from '@data/models/day-of-week';

@Injectable({
	providedIn: 'root',
})
export class DateService {
	constructor() {}

	public isSameDay(fromDate: Date, toDate: Date): boolean {
		return (
			fromDate.getDate() === toDate.getDate() &&
			fromDate.getMonth() === toDate.getMonth() &&
			fromDate.getFullYear() === toDate.getFullYear()
		);
	}

	public isSameMonth(fromDate: Date, toDate: Date): boolean {
		return fromDate.getMonth() === toDate.getMonth();
	}

	public addDays(date: Date, days: number): Date {
		const result = new Date(date);
		result.setDate(date.getDate() + days);
		return result;
	}

	public normalizeDatePeriod(datePeriod: DatePeriod): DatePeriod {
		if (datePeriod.startDate && datePeriod.endDate) {
			return datePeriod;
		} else {
			return { startDate: datePeriod.startDate };
		}
	}

	public getWeek(dateSelected: Date): DayOfWeek[] {
		const daysOfWeek: DayOfWeek[] = [];

		for (let i = -3; i <= 3; i++) {
			const dayOfWeek = this.addDays(dateSelected, i);
			daysOfWeek.push({
				date: dayOfWeek,
				isSelected: false,
			});
		}
		daysOfWeek[3].isSelected = true;
		return daysOfWeek;
	}

	public getWorkdays(dateSelected: Date): Date[] {
		const daysOfWeek: Date[] = [];
		const selectedDayOfWeek = dateSelected.getDay();
		const nearestMonday = this.addDays(dateSelected, -selectedDayOfWeek + 1);
		for (let i = 0; i <= 5; i++) {
			const dayOfWeek = this.addDays(nearestMonday, i);
			daysOfWeek.push(dayOfWeek);
		}
		return daysOfWeek;
	}
}
