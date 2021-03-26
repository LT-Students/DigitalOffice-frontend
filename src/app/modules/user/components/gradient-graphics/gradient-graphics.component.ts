import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { DatePeriod } from '@data/models/date-period';
import { AttendanceService } from '../../../../core/services/attendance.service';
import { DateService } from '../../../../core/services/date.service';

export interface IDailyHoursData {
  day: string;
  month: string;
  hours: number;
  minutes: number;
}

@Component({
  selector: 'do-gradient-graphics',
  templateUrl: './gradient-graphics.component.html',
  styleUrls: ['./gradient-graphics.component.scss'],
})
export class GradientGraphicsComponent implements OnInit, OnDestroy {
  private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);

  @Input()
  public timePeriodSelected: DatePeriod;
  @Input()
  public dailyHoursData; // data about day, month, hours, minutes of time period

  public startDate: Date;
  public endDate: Date;
  public daysOfWeek: Date[];

  constructor(
    public attendanceService: AttendanceService,
    public dateService: DateService
  ) {}

  // color for graphic items
  colorsData = [
    '#7adea2',
    '#8bdca5',
    '#9cdaa9',
    '#add8ad',
    '#bdd7b1',
    '#cdd5b4',
    '#ddd4b8',
    '#efd2bc',
  ];
  gray = '#EEEEEE';

  // define amount of graphic columns/strings
  amountOfWorkHours = [...Array(8).keys()];
  amountOfDays = [...Array(6).keys()];

  // determination of days when was processing
  processingArray = [];
  //

  // the variable define the data of string above graphic
  timePeriod;

  ngOnInit() {
    this.attendanceService.datePeriod$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((datePeriod) => {
        if (datePeriod.endDate) {
          this.daysOfWeek = this.dateService.getWorkdays(datePeriod.endDate);
        }
        this.startDate = this.daysOfWeek[0];
        this.endDate = this.daysOfWeek[5];
      });

    // make the line with period data
    let firstPartTimePeriod;
    let secondPartTimePeriod = ''; // use in the case of date consist from two month
    let breakIndex = this.dailyHoursData.length;

    // check if the data includes two month
    if (
      this.dailyHoursData[0].month !==
      this.dailyHoursData[this.dailyHoursData.length - 1].month
    ) {
      breakPoint: for (let i = 0; i < this.dailyHoursData.length; i++) {
        if (this.dailyHoursData[0].month !== this.dailyHoursData[i].month) {
          breakIndex = i;
          secondPartTimePeriod =
            ', ' +
            this.dailyHoursData[breakIndex].day +
            ' - ' +
            this.dailyHoursData[this.dailyHoursData.length - 1].day +
            ' ' +
            this.dailyHoursData[5].month;
          break breakPoint;
        }
      }
    }
    //

    // create string of time period
    firstPartTimePeriod =
      this.dailyHoursData[0].day +
      ' - ' +
      this.dailyHoursData[breakIndex - 1].day +
      ' ' +
      this.dailyHoursData[0].month;
    this.timePeriod = firstPartTimePeriod + secondPartTimePeriod;

    // to check processing in hours
    for (let i = 0; i < this.dailyHoursData.length; i++) {
      this.processingArray[i] =
        this.dailyHoursData[i].hours > 8 ||
        (this.dailyHoursData[i].hours === 8 &&
          this.dailyHoursData[i].minutes > 0);
    }
    //
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
