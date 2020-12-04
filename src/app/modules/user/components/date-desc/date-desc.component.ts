import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AttendanceService } from '../attendance/attendance.service';
import { IDayOfWeek } from '../../../../interfaces/day-of-week.interface';

@Component({
  selector: 'do-datedesc',
  templateUrl: './date-desc.component.html',
  styleUrls: ['./date-desc.component.scss'],
})
export class DateDescComponent implements OnInit, OnDestroy {
  private onDestroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  public startDate: Date | null;
  public endDate: Date | null;
  public daysOfWeek: IDayOfWeek[];

  constructor(
    public attendanceService: AttendanceService,
    private dateAdapter: DateAdapter<Date>
  ) {}

  ngOnInit(): void {
    this.attendanceService.datePeriod$
      .pipe(takeUntil(this.onDestroy))
      .subscribe((datePeriod) => {
        this.startDate = datePeriod.startDate;
        this.endDate = datePeriod.endDate;
        if (this.endDate) {
          this.daysOfWeek = this.getWeek(this.endDate);
        }
      });

    this.startDate = this.attendanceService.datePeriod$.getValue().startDate;
    this.endDate = this.attendanceService.datePeriod$.getValue().endDate;
    this.daysOfWeek = this.getWeek(this.endDate);

    this.dateAdapter.setLocale('ru');
    this.dateAdapter.getFirstDayOfWeek = () => 1;
  }

  private getWeek(dateSelected: Date): IDayOfWeek[] {
    const daysOfWeek: IDayOfWeek[] = [];

    for (let i = -3; i <= 3; i++) {
      const dayOfWeek = this.attendanceService.addDays(dateSelected, i);
      daysOfWeek.push({
        date: dayOfWeek,
        isSelected: false,
      });
    }
    daysOfWeek[3].isSelected = true;
    return daysOfWeek;
  }

  public disableWeekends = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  public selectDay(dayOfWeek): void {
    this.daysOfWeek = this.getWeek(dayOfWeek.date);
    this.attendanceService.onDatePeriodChange({
      startDate: dayOfWeek.date,
      endDate: dayOfWeek.date,
    });
  }

  public onDateInput(date: Date | null, isStartDate: boolean) {
    if (date) {
      if (isStartDate) {
        this.attendanceService.onDatePeriodChange({
          startDate: date,
          endDate: null,
        });
        this.daysOfWeek = this.getWeek(date);
      } else {
        this.attendanceService.onDatePeriodChange({
          startDate: null,
          endDate: date,
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
