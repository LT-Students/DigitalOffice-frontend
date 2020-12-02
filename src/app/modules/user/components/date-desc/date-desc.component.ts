import { Component, Input, OnInit, OnDestroy } from '@angular/core';
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
export class DateDescComponent implements OnInit, OnDestroy {
  plannedTime: Time;

  fromDate: Date | null;
  toDate: Date | null;

  daysOfWeek: { date: Date; selected: boolean }[];

  constructor(
    public attendanceService: AttendanceService,
    private dateAdapter: DateAdapter<Date>
  ) {}

  ngOnInit(): void {
    this.attendanceService.timePeriod$.subscribe((timePeriod) => {
      this.fromDate = timePeriod.from;
      this.toDate = timePeriod.to;
      if (this.toDate) {
        this.daysOfWeek = this.getWeek(this.toDate);
      }
    });

    this.fromDate = this.attendanceService.currentTimePeriod.from;
    this.toDate = this.attendanceService.currentTimePeriod.to;
    this.daysOfWeek = this.getWeek(this.toDate);

    this.plannedTime = this.attendanceService.countPlannedHours();

    this.dateAdapter.setLocale('ru');
    this.dateAdapter.getFirstDayOfWeek = () => 1;
  }

  disableWeekends = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  private getWeek(dateSelected: Date): { date: Date; selected: boolean }[] {
    const daysOfWeek: { date: Date; selected: boolean }[] = [];

    for (let i = -3; i <= 3; i++) {
      const dayOfWeek = this.attendanceService.addDays(dateSelected, i);
      daysOfWeek.push({
        date: dayOfWeek,
        selected: false,
      });
    }
    daysOfWeek[3].selected = true;
    return daysOfWeek;
  }

  selectDay(dayOfWeek): void {
    this.daysOfWeek = this.getWeek(dayOfWeek.date);
    this.attendanceService.onTimePeriodChange({
      from: dayOfWeek.date,
      to: dayOfWeek.date,
    });
  }

  onDateInput(date: Date | null, isStartDate: boolean) {
    if (date) {
      if (isStartDate) {
        this.attendanceService.onTimePeriodChange({ from: date, to: null });
        this.daysOfWeek = this.getWeek(date);
      } else {
        this.attendanceService.onTimePeriodChange({ from: null, to: date });
      }
    }
  }

  ngOnDestroy(): void {
    this.attendanceService.timePeriod$.unsubscribe();
  }
}
