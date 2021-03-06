import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { IDatePeriod } from '../../../../core/interfaces/date-period.interface';
import { AttendanceService } from '../../../../core/services/attendance.service';
import { ProjectStore } from '../../../../data/store/project.store';
import { DateService } from '../../../../core/services/date.service';
import { Project } from '../../../../data/models/project';

@Component({
  selector: 'do-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss'],
})
export class UserTasksComponent implements OnInit, OnDestroy {
  @Input() timePeriodSelected: IDatePeriod;

  private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);

  public projects: Project[];

  isOrderedByProject = false;
  isOrderedByHours = false;
  startPeriod: Date;
  endPeriod: Date;
  tasksCount = 0;

  public startDate: Date | null;
  public endDate: Date | null;

  constructor(
    public attendanceService: AttendanceService,
    private projectStore: ProjectStore,
    public dateService: DateService
  ) {}

  ngOnInit() {
    this.projectStore.projects$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((projects) => (this.projects = projects));

    this.attendanceService.datePeriod$
      .pipe(takeUntil(this.onDestroy$))
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
        .map((p) => p.workTime)
        .reduce((all, tasks) => all.concat(tasks)).length;
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  sortByProject(): void {
    this.isOrderedByProject = !this.isOrderedByProject;
  }
  sortByHours(): void {
    this.isOrderedByHours = !this.isOrderedByHours;
  }
}
