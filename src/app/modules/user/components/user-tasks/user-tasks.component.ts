import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { IProject } from '../../../../interfaces/project.interface';
import { ITimePeriod } from '../../../../interfaces/time-period.interface';
import { AttendanceService } from '../attendance/attendance.service';


@Component({
  selector: 'do-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent implements OnInit, OnDestroy {

  @Input() timePeriodSelected: ITimePeriod;
  public projects: IProject[]

  isOrderedByProject: boolean = false;
  isOrderedByHours: boolean = false;
  startPeriod: Date;
  endPeriod: Date;
  tasksCount: number = 0;
  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {
    this.attendanceService.projects$.subscribe((projects: IProject[]) => this.projects = projects);

    const now = new Date();
    this.startPeriod = new Date();
    this.startPeriod.setDate(now.getDate() - 3);
    this.endPeriod = new Date();
    this.endPeriod.setDate(now.getDate() + 3);
    if (this.projects.length !== 0){
      this.tasksCount = this.projects.map((p) => p.tasks).reduce((all, tasks) => all.concat(tasks)).length;
    }
  }

  ngOnDestroy() {
    this.attendanceService.projects$.unsubscribe();
  }

  sortByProject(): void {
    this.isOrderedByProject = !this.isOrderedByProject;
  }
  sortByHours(): void {
    this.isOrderedByHours = !this.isOrderedByHours;
  }
}

