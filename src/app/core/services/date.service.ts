import { Injectable } from '@angular/core';
import { DatePeriod } from '@data/models/date-period';
import { DayOfWeek } from '@data/models/day-of-week';

@Injectable({
	providedIn: 'root',
})
export class DateService {
	constructor() {}

	public isSameDay(fromDate: Date | null, toDate: Date | null): boolean {
		return fromDate?.getTime() === toDate?.getTime();
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
			return { startDate: datePeriod.startDate, endDate: null };
		}
	}

	public getDefaultDatePeriod(): DatePeriod {
		// const today: Date = new Date();
		const startDate: Date = new Date();
		const endDate: Date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);

		// const today = new Date();
		// const inWeek = this.addDays(today, daysFromToday);
		return { startDate, endDate };
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
