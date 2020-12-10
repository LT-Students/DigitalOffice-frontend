import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Time } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { User } from '@digital-office/api/user-service';
import { AttendanceService } from '../attendance/attendance.service';
import { IProject } from '../../../../interfaces/project.interface';
import { ITask } from '../../../../interfaces/task.interface';
import { IDatePeriod } from '../../../../interfaces/date-period.interface';

@Component({
  selector: 'do-add-hours',
  templateUrl: './add-hours.component.html',
  styleUrls: ['./add-hours.component.scss'],
})
export class AddHoursComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @ViewChild('task') inputTask: ElementRef;
  @ViewChild('description') textFieldDescription: ElementRef;
  @ViewChild('hours') inputHours: ElementRef;
  @ViewChild('minutes') inputMinutes: ElementRef;

  private onDestroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  _projects: IProject[];
  projectSelected: string;

  hours = 8;
  minutes = 0;

  public addHoursForm: FormGroup;

  public minutesMask = [/[0-5]/, /\d/];
  public hoursMask = [/\d/, /\d/];

  public recommendedTime: Time = { hours: 8, minutes: 0 };

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit() {
    this.addHoursForm = this.fb.group({
      hours: ['08', Validators.required],
      minutes: ['00', Validators.required],
      project: [''],
      task: [''],
      description: [''],
    });

    this.onChanges();

    this._projects = this.attendanceService.getProjects();
    this.attendanceService.plannedHours$
      .pipe(takeUntil(this.onDestroy))
      .subscribe((period: IDatePeriod) => {
        this.recommendedTime = this.attendanceService.countPlannedHours(period);
      });
  }

  onChanges(): void {
    const hoursControl = this.addHoursForm.get('hours');

    hoursControl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe((val) => {
        if (val.length === 2 && val[1] !== '_') {
          this.inputMinutes.nativeElement.focus();
        }
      });
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

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
