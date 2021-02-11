import { Injectable } from '@angular/core';
import { IDatePeriod } from '../interfaces/date-period.interface';
import { IDayOfWeek } from '../interfaces/day-of-week.interface';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  isSameDay(fromDate: Date, toDate: Date): boolean {
    return fromDate.getTime() === toDate.getTime();
  }

  isSameMonth(fromDate: Date, toDate: Date): boolean {
    return fromDate.getMonth() === toDate.getMonth();
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  }

  normalizeDatePeriod(datePeriod: IDatePeriod): IDatePeriod {
    if (datePeriod.startDate && datePeriod.endDate) {
      return datePeriod;
    } else {
      return { startDate: datePeriod.startDate, endDate: null };
    }
  }

  getDefaultDatePeriod(daysFromToday: number): IDatePeriod {
    const today = new Date();
    const inWeek = this.addDays(today, daysFromToday);
    return { startDate: today, endDate: inWeek };
  }

  getWeek(dateSelected: Date): IDayOfWeek[] {
    const daysOfWeek: IDayOfWeek[] = [];

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

  getWorkdays(dateSelected: Date): Date[] {
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
