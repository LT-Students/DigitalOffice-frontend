import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Time } from '@angular/common';

import { User } from '@digital-office/api/user-service';

import { ITimePeriod } from '../../../../interfaces/time-period.interface';
import { AttendanceService } from '../attendance/attendance.service';
import { IProject } from '../../../../interfaces/project.interface';
import { ITask } from '../../../../interfaces/task.interface';

@Component({
  selector: 'do-add-hours',
  templateUrl: './add-hours.component.html',
  styleUrls: ['./add-hours.component.scss'],
})
export class AddHoursComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @ViewChild('task') inputTask: ElementRef;
  @ViewChild('description') textFieldDescription: ElementRef;
  @ViewChild('inputHours') inputHours: ElementRef;
  @ViewChild('inputMinutes') inputMinutes: ElementRef;

  _projects: IProject[];

  projectSelected: string;

  public recommendedTime: Time = { hours: 8, minutes: 0 };

  constructor(private attendanceService: AttendanceService) {
    this._projects = attendanceService.getProjects();
  }

  ngOnInit() {
    this.attendanceService.plannedHours$.subscribe((period: ITimePeriod) => {
      this.recommendedTime = this.attendanceService.countPlannedHours(period);
    });
  }

  ngOnDestroy() {
    this.attendanceService.plannedHours$.unsubscribe();
  }

  getProjectNames(): string[] {
    return this._projects.map((project: IProject) => project.name);
  }

  addTask() {
    let project_id = this.attendanceService.getProjectIdByName(
      this.projectSelected
    );
    let task: ITask = {
      name: this.inputTask.nativeElement.value,
      description: this.textFieldDescription.nativeElement.value,
      createdAt: new Date(),
      time: {
        hours: this.inputHours.nativeElement.value,
        minutes: this.inputMinutes.nativeElement.value,
      },
    };
    this.attendanceService.addTaskToProject(task, project_id);
  }
}
