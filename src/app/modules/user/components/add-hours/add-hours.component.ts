import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Time } from '@angular/common';

import { ITimePeriod } from '../../../../interfaces/time-period.interface';
import { AttendanceService } from '../attendance/attendance.service';
import { IProject } from '../../../../interfaces/project.interface';
import { ITask } from '../../../../interfaces/task.interface';
import { UserResponse } from '../../../../../../libs/api/src/lib/user-service';

@Component({
  selector: 'app-add-hours',
  templateUrl: './add-hours.component.html',
  styleUrls: ['./add-hours.component.scss']
})
export class AddHoursComponent implements OnInit, OnDestroy {

  @Input() userq: UserResponse;
  @ViewChild('task', {static: false}) inputTask: ElementRef;
  @ViewChild('description', {static: false}) textFieldDescription: ElementRef;
  @ViewChild('inputHours', {static: false}) inputHours: ElementRef;
  @ViewChild('inputMinutes', {static: false}) inputMinutes: ElementRef;

  _projects: IProject[];

  projectSelected: string;

  public recommendedTime: Time = {hours: 8, minutes: 0};


  constructor(private attendanceService: AttendanceService) {
    this._projects = attendanceService.getProjects();
  }

  ngOnInit() {
    this.attendanceService.plannedHours$.subscribe((period: ITimePeriod) => {
      this.recommendedTime = this.attendanceService.countPlannedHours(period)
    })
  }

  ngOnDestroy() {
    this.attendanceService.plannedHours$.unsubscribe();
  }

  getProjectNames(): string[] {
    return this._projects.map((project: IProject) => project.name);
  }

  addTask() {
    let project_id = this.attendanceService.getProjectIdByName(this.projectSelected);
    let task: ITask = {
      name: this.inputTask.nativeElement.value,
      description: this.textFieldDescription.nativeElement.value,
      createdAt: new Date(),
      time: {
        hours: this.inputHours.nativeElement.value,
        minutes: this.inputMinutes.nativeElement.value
      }
    }
    this.attendanceService.addTaskToProject(task, project_id);
  }

}
