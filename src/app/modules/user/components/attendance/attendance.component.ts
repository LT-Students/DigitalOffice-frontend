import { Component, OnInit } from '@angular/core';

import { DatePeriod } from '@data/models/date-period';
import { Project } from '@data/models/project';
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

@Component({
  selector: 'do-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  public project: Project;

  public timePeriodSelected: DatePeriod = {
    startDate: new Date(),
  };

  public dailyHoursData: DateTimeFormatOptions[] = [
    { day: '22', month: 'june', hour: '6', minute: '0' },
    { day: '23', month: 'june', hour: '2', minute: '30' },
    { day: '24', month: 'june', hour: '8', minute: '0' },
    { day: '25', month: 'june', hour: '8', minute: '50' },
    { day: '26', month: 'june', hour: '6', minute: '30' },
    { day: '27', month: 'june', hour: '0', minute: '0' },
  ];

  constructor() {}

  ngOnInit() {}
}
