import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { IProject } from '../../../../interfaces/project.interface';
import { IDatePeriod } from '../../../../interfaces/date-period.interface';
import { AttendanceService } from '../attendance/attendance.service';

@Component({
  selector: 'do-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss'],
})
export class UserTasksComponent implements OnInit, OnDestroy {
  @Input() timePeriodSelected: IDatePeriod;

  private onDestroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  public projects: IProject[];

  isOrderedByProject = false;
  isOrderedByHours = false;
  startPeriod: Date;
  endPeriod: Date;
  tasksCount = 0;

  public startDate: Date | null;
  public endDate: Date | null;

  constructor(public attendanceService: AttendanceService) {}

  ngOnInit() {
    this.attendanceService.projects$.subscribe(
      (projects: IProject[]) => (this.projects = projects)
    );

    this.attendanceService.datePeriod$
      .pipe(takeUntil(this.onDestroy))
      .subscribe((datePeriod) => {
        this.startDate = datePeriod.startDate;
        this.endDate = datePeriod.endDate;
      });

    const now = new Date();
    this.startPeriod = new Date();
    this.startPeriod.setDate(now.getDate() - 3);
    this.endPeriod = new Date();
    this.endPeriod.setDate(now.getDate() + 3);
    if (this.projects.length !== 0) {
      this.tasksCount = this.projects
        .map((p) => p.tasks)
        .reduce((all, tasks) => all.concat(tasks)).length;
    }
  }

  ngOnDestroy() {
    this.attendanceService.projects$.unsubscribe();
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  sortByProject(): void {
    this.isOrderedByProject = !this.isOrderedByProject;
  }
  sortByHours(): void {
    this.isOrderedByHours = !this.isOrderedByHours;
  }
}
