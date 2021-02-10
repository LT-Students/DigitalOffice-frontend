import { Component, OnDestroy, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { Time } from '@angular/common';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Chart } from 'chart.js';
import { AttendanceService } from '../attendance/attendance.service';
import { IProject } from '../../../../interfaces/project.interface';
import { ITask } from '../../../../interfaces/task.interface';

@Component({
  selector: 'do-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);
  private ctx: CanvasRenderingContext2D;
  private chart: Chart;
  private minutesByProject: number[];

  public COLORS = [
    '#7C799B',
    '#C7C6D8',
    '#FFB2B2',
    '#FFB78C',
    '#EB5757',
    '#BC7BFA',
    '#FFBE97',
    '#BDBDBD',
  ];
  public projects: IProject[];
  public recommendedTime: Time;
  public spentTime: Time;
  public remainingTime: Time;
  public remainingTimeStatus: 'positive' | 'zero' | 'negative';
  public isPeriodEmpty: boolean;
  public isFirstTaskForPeriod: boolean;

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.attendanceService.recommendedTime$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((time) => {
        this.recommendedTime = time;
      });

    this.attendanceService.projects$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((projects) => {
        this.projects = projects;
        this.buildChart();
      });
  }

  private countWorkTime() {
    const spentMinutes = this.minutesByProject.reduce(
      (sum, projectMinutes) => sum + projectMinutes,
      0
    );
    const recommendedMinutes =
      this.recommendedTime.hours * 60 + this.recommendedTime.minutes;
    const remainingMinutes = recommendedMinutes - spentMinutes;

    this.spentTime = {
      hours: Math.floor(spentMinutes / 60),
      minutes: spentMinutes % 60,
    };

    if (remainingMinutes < 0) {
      this.remainingTimeStatus = 'negative';
      this.remainingTime = {
        hours: Math.ceil(remainingMinutes / 60),
        minutes: remainingMinutes % 60,
      };
    } else if (remainingMinutes === 0) {
      this.remainingTimeStatus = 'zero';
      this.remainingTime = {
        hours: 0,
        minutes: 0,
      };
    } else {
      this.remainingTimeStatus = 'positive';
      this.remainingTime = {
        hours: Math.floor(remainingMinutes / 60),
        minutes: remainingMinutes % 60,
      };
    }
  }

  private getData(): number[] {
    return this.projects.map((project: IProject) =>
      project.tasks.reduce(
        (sum, task: ITask) => sum + task.time.hours * 60 + task.time.minutes,
        0
      )
    );
  }

  private updateChart(): void {
    this.chart.data.datasets[0].data = this.getData();
    this.chart.update();
  }

  private buildChart() {
    this.minutesByProject = this.getData();
    this.isPeriodEmpty = !this.minutesByProject.some(
      (minutes: number) => minutes > 0
    );
    this.countWorkTime();

    if (this.isPeriodEmpty) {
      this.chart = new Chart(this.ctx, {
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
      this.isFirstTaskForPeriod = true;
    } else if (this.isFirstTaskForPeriod) {
      this.chart.data.datasets[0].backgroundColor = this.COLORS;
      this.updateChart();
      this.isFirstTaskForPeriod = false;
    } else {
      this.updateChart();
    }
  }

  public abs(x: number): number {
    return Math.abs(x);
  }

  ngOnDestroy() {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
