import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { Time } from '@angular/common';
import { Chart } from 'chart.js';

import { ITimePeriod } from '../../../../interfaces/time-period.interface';
import { AttendanceService } from '../attendance/attendance.service';
import { IProject } from '../../../../interfaces/project.interface';
import { ITask } from '../../../../interfaces/task.interface';

@Component({
  selector: 'do-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() allHoursPlan;
  public projects: IProject[];

  // Hours of plan
  public timeDescriptionValue: Time; // Difference between hours in the center under hours

  public recommendedTime: Time = { hours: 8, minutes: 0 };

  COLORS = [
    '#7C799B',
    '#C7C6D8',
    '#FFB2B2',
    '#FFB78C',
    '#EB5757',
    '#BC7BFA',
    '#FFBE97',
    '#BDBDBD',
  ];

  // variables for hours in the center
  allHoursColor;

  public spentTime;
  // variables for string under hours in the center of the chart
  timeDescriptionBackgroundColor;

  timeDescriptionFontSize;
  timeDescriptionColor;
  //
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  //
  constructor(private attendanceService: AttendanceService) {
    this.projects = this.attendanceService.getProjects();
  }

  ngOnInit() {
    this.attendanceService.plannedHours$.subscribe((period: ITimePeriod) => {
      this.recommendedTime = this.attendanceService.countPlannedHours(period);
    });

    const minutesByProjects = this.projects.map((project: IProject) => {
      return this.countMinutesByTask(project);
    });
    //

    // donut building
    this.ctx = this.canvas.nativeElement.getContext('2d');

    if (minutesByProjects.every((minutes: number) => minutes > 0)) {
      let allSpentMinutes = minutesByProjects.reduce(
        (sum, totalTime) => sum + totalTime,
        0
      );
      let allRecommendedMinutes =
        this.recommendedTime.hours * 60 + this.recommendedTime.minutes;

      let recommendedHoursRemain = allRecommendedMinutes - allSpentMinutes;

      this.recommendedTime = {
        hours: Math.round(recommendedHoursRemain / 60),
        minutes: recommendedHoursRemain % 60,
      };

      this.spentTime = {
        hours: Math.round(allSpentMinutes / 60),
        minutes: allSpentMinutes % 60,
      };

      this.timeDescriptionValue = this.recommendedTime;

      this.allHoursColor = '#434348';
      //

      // String under hours
      this.timeDescriptionColor = '#FFFFFF';
      Number(this.timeDescriptionValue) >= 0
        ? (this.timeDescriptionBackgroundColor = '#21D373')
        : (this.timeDescriptionBackgroundColor = '#EB5757');
      this.timeDescriptionFontSize = '16px';
      //

      let myChart = new Chart(this.ctx, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: minutesByProjects,
              backgroundColor: this.COLORS,
              borderWidth: 0,
            },
          ],
        },
        options: {
          cutoutPercentage: 70,
          tooltips: {
            enabled: false,
          },
        },
      });
    } else {
      // Hours in the center
      this.allHoursColor = '#BDBDBD';
      //

      // String under hours
      // this.timeDescriptionValue = 'Запланировано';
      this.timeDescriptionBackgroundColor = '#FFFFFF';
      this.timeDescriptionColor = '#BDBDBD';
      this.timeDescriptionFontSize = '14px';
      //

      let myChart = new Chart(this.ctx, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [1],
              backgroundColor: '#F1F1EF',
              borderWidth: 0,
            },
          ],
        },
        options: {
          cutoutPercentage: 70,
          tooltips: {
            enabled: false,
          },
        },
      });
    }
  }

  ngOnDestroy() {
    this.attendanceService.plannedHours$.unsubscribe();
  }

  countMinutesByTask(project: IProject): number {
    let allMinutesCounted = project.tasks.reduce(
      (sum, task: ITask) => sum + task.time.minutes,
      0
    );
    let allHoursCounted = project.tasks.reduce(
      (sum, task: ITask) => sum + task.time.hours,
      0
    );
    let allHoursImMinutes = allHoursCounted * 60;
    return allMinutesCounted + allHoursImMinutes;
  }
}
