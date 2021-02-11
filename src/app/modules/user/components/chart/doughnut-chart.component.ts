import { Component, OnDestroy, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { Time } from '@angular/common';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Chart } from 'chart.js';
import { AttendanceService } from '../../../../services/attendance.service';
import { IProject } from '../../../../interfaces/project.interface';
import { ITask } from '../../../../interfaces/task.interface';
import { ProjectStoreService } from '../../../../services/project-store.service';

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
  public isPeriodEmpty: boolean;

  constructor(
    private attendanceService: AttendanceService,
    private projectStore: ProjectStoreService
  ) {}

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.attendanceService.recommendedTime$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((time) => {
        this.recommendedTime = time;
      });

    this.projectStore.projects$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((projects) => {
        this.projects = projects;
        this.buildChart();
      });
  }

  get spentMinutes() {
    return this.minutesByProject.reduce(
      (sum, projectMinutes) => sum + projectMinutes,
      0
    );
  }

  get remainingMinutes() {
    const recommendedMinutes =
      this.recommendedTime.hours * 60 + this.recommendedTime.minutes;
    return recommendedMinutes - this.spentMinutes;
  }

  private countWorkTime() {
    this.spentTime = {
      hours: Math.floor(this.spentMinutes / 60),
      minutes: this.spentMinutes % 60,
    };

    const minutes = this.remainingMinutes % 60;
    const hours = this.remainingMinutes
      ? Math.floor(this.remainingMinutes / 60)
      : Math.ceil(this.remainingMinutes / 60);
    this.remainingTime = {
      hours,
      minutes,
    };
  }

  getRemainingTimeStatus(): string {
    if (this.remainingMinutes > 0) {
      return 'positive';
    } else if (this.remainingMinutes < 0) {
      return 'negative';
    } else {
      return 'zero';
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
    this.chart.data.datasets[0].backgroundColor = this.COLORS;
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
