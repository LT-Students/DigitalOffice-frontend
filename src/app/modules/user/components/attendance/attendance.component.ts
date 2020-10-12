import { Component, OnInit } from '@angular/core';

import { IDailyHoursData } from '../gradient-graphics/gradient-graphics.component';
import { ITimePeriod } from '../../../../interfaces/time-period.interface';
import { IProject } from '../../../../interfaces/project.interface';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  public project: IProject;

  public timePeriodSelected: ITimePeriod = {
    from: new Date(),
  };

  public dailyHoursData: IDailyHoursData[] = [
    { day: '22', month: 'june', hours: 6, minutes: 0 },
    { day: '23', month: 'june', hours: 2, minutes: 30 },
    { day: '24', month: 'june', hours: 8, minutes: 0 },
    { day: '25', month: 'june', hours: 8, minutes: 50 },
    { day: '26', month: 'june', hours: 6, minutes: 30 },
    { day: '27', month: 'june', hours: 0, minutes: 0 },
  ];

  constructor() {}

  ngOnInit() {}
}
