import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Time } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { User } from '@digital-office/api/user-service';
import { AttendanceService } from '../attendance/attendance.service';
import { IProject } from '../../../../interfaces/project.interface';
import { ITask } from '../../../../interfaces/task.interface';
import { timeValidator } from './add-hours.validators';

@Component({
  selector: 'do-add-hours',
  templateUrl: './add-hours.component.html',
  styleUrls: ['./add-hours.component.scss'],
})
export class AddHoursComponent implements OnInit, OnDestroy {
  @Input() user: User;
  private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);

  public projects: IProject[];
  public addHoursForm: FormGroup;
  public setTimePeriod: Time;

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit() {
    this.addHoursForm = this.fb.group({
      time: this.fb.group({
        hours: [
          '',
          [Validators.required, timeValidator(() => this.getHours())],
        ],
        minutes: ['', [Validators.required, Validators.max(59)]],
      }),
      project: ['', Validators.required],
      task: ['', Validators.required],
      description: [''],
    });

    this.attendanceService.recommendedTime$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((timePeriod) => {
        this.setTimePeriod = timePeriod;
        this.addHoursForm
          .get('time.hours')
          .setValue(this.attendanceService.normalizeTime(timePeriod.hours));
        this.addHoursForm
          .get('time.minutes')
          .setValue(this.attendanceService.normalizeTime(timePeriod.minutes));
      });

    this.projects = this.attendanceService.projects$.getValue();
  }

  private getHours(): number {
    const currentDatePeriod = this.attendanceService.datePeriod$.getValue();
    return Number(
      this.attendanceService.countRecommendedTime(currentDatePeriod, 24).hours
    );
  }

  public onSubmit(): void {
    const project_id = Number(this.addHoursForm.get('project').value);
    const task: ITask = {
      name: this.addHoursForm.get('task').value,
      description: this.addHoursForm.get('description').value,
      createdAt: new Date(),
      time: {
        hours: Number(this.addHoursForm.get('time.hours').value),
        minutes: Number(this.addHoursForm.get('time.minutes').value),
      },
    };
    this.attendanceService.addTaskToProject(task, project_id);
    this.addHoursForm.reset();
    const datePeriod = this.attendanceService.datePeriod$.getValue();
    this.attendanceService.onDatePeriodChange(datePeriod);
  }

  public getTimePeriodErrorMessage(): String {
    const hours = this.addHoursForm.get('time.hours');
    const minutes = this.addHoursForm.get('time.minutes');

    if (hours.hasError('periodExceedsMaxValue')) {
      return 'Превышено максимальное время для выбранного периода';
    }
    if (minutes.hasError('max')) {
      return 'Введите корректные минуты';
    }
    return 'Введите корретный период времени';
  }

  ngOnDestroy() {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
