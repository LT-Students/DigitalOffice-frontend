import { Component, Input, OnInit } from '@angular/core';
import 'moment/locale/ru';
import { Time } from '@angular/common';
import { DateAdapter } from '@angular/material/core';

import { ITimePeriod } from '../../../../interfaces/time-period.interface';
import { AttendanceService } from '../attendance/attendance.service';

@Component({
  selector: 'do-datedesc',
  templateUrl: './date-desc.component.html',
  styleUrls: ['./date-desc.component.scss'],
})
export class DateDescComponent implements OnInit {
  @Input() timePeriodSelected: ITimePeriod;
  plannedTime: Time;

  fromDate: Date | null;
  toDate: Date | null;

  daysOfWeek: { date: Date; selected: boolean }[];

  constructor(
    private attendanceService: AttendanceService,
    private dateAdapter: DateAdapter<Date>
  ) {}

  ngOnInit(): void {
    this.fromDate = new Date();
    this.toDate = this.addDays(this.fromDate, 10);

    this.daysOfWeek = this.getWeek();

    if (!this.timePeriodSelected.to) {
      this.plannedTime = { hours: 8, minutes: 0 };
    }

    this.dateAdapter.setLocale('ru');
    this.dateAdapter.getFirstDayOfWeek = () => 1;
  }

  private disableWeekends = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  }

  private getWeek(
    dateSelected: Date = new Date()
  ): { date: Date; selected: boolean }[] {
    const daysOfWeek: { date: Date; selected: boolean }[] = [];

    for (let i = -3; i <= 3; i++) {
      const dayOfWeek = this.addDays(dateSelected, i);
      daysOfWeek.push({
        date: dayOfWeek,
        selected: false,
      });
    }
    daysOfWeek[3].selected = true;
    return daysOfWeek;
  }

  private selectDay(dayOfWeek): void {
    this.daysOfWeek.forEach((d) => {
      d.selected = false;
    });

    this.timePeriodSelected = {
      from: dayOfWeek.date,
      to: null,
    };
    dayOfWeek.selected = true;
    this.attendanceService.setPlannedHoursByTimePeriod(this.timePeriodSelected);
  }

  private checkSelectedPeriod(date: Date): void {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.timePeriodSelected.from = date;
    } else if (this.fromDate && !this.toDate && date > this.fromDate) {
      this.toDate = date;
      this.timePeriodSelected.to = date;
    } else {
      this.toDate = null;
      this.timePeriodSelected.to = null;
      this.fromDate = date;
      this.timePeriodSelected.from = date;
    }
  }

  private onDateSelection(date: Date): void {
    this.checkSelectedPeriod(date);
    this.daysOfWeek = this.timePeriodSelected.to
      ? this.getWeek(this.timePeriodSelected.to)
      : this.getWeek(this.timePeriodSelected.from);
    this.attendanceService.setPlannedHoursByTimePeriod(this.timePeriodSelected);
  }

  private onDateInput(date: Date | null) {
    if (date !== null) {
      this.onDateSelection(date);
    }
  }
}
