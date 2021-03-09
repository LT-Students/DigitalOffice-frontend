import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Time } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { AttendanceService } from '@app/services/attendance.service';
import { ProjectStore } from '@data/store/project.store';
import { Project } from '@data/models/project';
import { WorkTime } from '@data/models/work-time';
import { timeValidator } from './add-hours.validators';
import { User } from '@data/api/user-service/models/user';

@Component({
  selector: 'do-add-hours',
  templateUrl: './add-hours.component.html',
  styleUrls: ['./add-hours.component.scss'],
})
export class AddHoursComponent implements OnInit, OnDestroy {
  @Input() user: User;
  private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);

  public projects: Project[];
  public addHoursForm: FormGroup;
  public setTimePeriod: Time;

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private projectStore: ProjectStore
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

    this.projects = this.projectStore.projects;
  }

  private getHours(): number {
    const currentDatePeriod = this.attendanceService.datePeriod;
    return Number(
      this.attendanceService.getRecommendedTime(currentDatePeriod, 24).hours
    );
  }

  public onSubmit(): void {
    const projectId = this.addHoursForm.get('project').value;
    const workTime: Partial<WorkTime> = {
      title: this.addHoursForm.get('task').value,
      description: this.addHoursForm.get('description').value,
      createdAt: new Date(),
      minutes:
        Number(this.addHoursForm.get('time.minutes').value) +
        Number(this.addHoursForm.get('time.hours').value) * 60,
    };
    this.projectStore.addWorkTimeToProject(workTime, projectId);
    this.addHoursForm.reset();
    const datePeriod = this.attendanceService.datePeriod;
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
