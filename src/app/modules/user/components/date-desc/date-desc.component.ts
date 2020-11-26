import { Component, Input, OnInit } from '@angular/core';
import 'moment/locale/ru';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Time } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { ITimePeriod } from '../../../../interfaces/time-period.interface';
import { AttendanceService } from '../attendance/attendance.service';

@Component({
  selector: 'do-datedesc',
  templateUrl: './date-desc.component.html',
  styleUrls: ['./date-desc.component.scss'],
})
export class DateDescComponent implements OnInit {
  public visible = false;

  @Input() timePeriodSelected: ITimePeriod;
  plannedTime: Time;
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  daysOfWeek: any;

  constructor(
    calendar: NgbCalendar,
    private attendanceService: AttendanceService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.daysOfWeek = this.getWeek();

    if (!this.timePeriodSelected.to) {
      this.plannedTime = { hours: 8, minutes: 0 };
    }

    this.dateAdapter.setLocale('ru');
    this.dateAdapter.getFirstDayOfWeek = () => {
      return 1;
    };
  }

  getWeek(dateSelected: Date = new Date()): Date[] {
    const daysOfWeek = [];

    for (let i = -3; i <= 3; i++) {
      const dayOfWeek = new Date();
      dayOfWeek.setDate(dateSelected.getDate() + i);
      daysOfWeek.push({
        date: dayOfWeek,
        selected: false,
      });
    }
    daysOfWeek[3].selected = true;
    return daysOfWeek;
  }

  selectDay(dayOfWeek): void {
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

  onDateSelection(event: NgbDate): void {
    this.checkSelectedPeriod(event);
    this.daysOfWeek = this.timePeriodSelected.to
      ? this.getWeek(this.timePeriodSelected.to)
      : this.getWeek(this.timePeriodSelected.from);
    this.attendanceService.setPlannedHoursByTimePeriod(this.timePeriodSelected);
  }

  checkSelectedPeriod(date: NgbDate): void {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.timePeriodSelected.from = this.getDateInStandart(date);
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.timePeriodSelected.to = this.getDateInStandart(date);
    } else {
      this.toDate = null;
      this.timePeriodSelected.to = null;
      this.fromDate = date;
      this.timePeriodSelected.from = this.getDateInStandart(date);
    }
  }

  isHovered(date: NgbDate): boolean {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate): boolean {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate): boolean {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  getDateInStandart(date: NgbDate): Date {
    return new Date(date.year, date.month - 1, date.day);
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  onDateInput(date: Date | null, isStartDate: boolean) {
    if (date !== null) {
      const ngbDate = NgbDate.from({
        day: date.getUTCDate() + 1,
        month: date.getUTCMonth() + 1,
        year: date.getUTCFullYear(),
      });
      this.onDateSelection(ngbDate);
    }
  }
}
