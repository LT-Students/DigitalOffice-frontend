import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
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
  private onDestroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  private projects: IProject[];

  public addHoursForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit() {
    this.addHoursForm = this.fb.group({
      time: this.fb.group({
        hours: [
          '',
          [
            Validators.required,
            this.datePeriodValidator.bind(this),
            timeValidator(() => this.getHours()),
          ],
        ],
        minutes: ['', [Validators.required, this.minutesValidator.bind(this)]],
      }),
      project: ['', Validators.required],
      task: ['', Validators.required],
      description: [''],
    });

    this.attendanceService.recommendedTime$
      .pipe(takeUntil(this.onDestroy))
      .subscribe((timePeriod) => {
        this.addHoursForm
          .get('time.hours')
          .setValue(this.attendanceService.normalizeTime(timePeriod.hours));
        this.addHoursForm
          .get('time.minutes')
          .setValue(this.attendanceService.normalizeTime(timePeriod.minutes));
      });

    this.attendanceService.datePeriod$
      .pipe(takeUntil(this.onDestroy))
      .subscribe((datePeriod) => {
        this.addHoursForm.get('time.hours').updateValueAndValidity();
      });

    this.projects = this.attendanceService.getProjects();
  }

  private getHours(): number {
    const currentDatePeriod = this.attendanceService.datePeriod$.getValue();
    return (
      +this.attendanceService.countRecommendedTime(currentDatePeriod).hours * 3
    );
  }

  public getProjectNames(): string[] {
    return this.projects.map((project: IProject) => project.name);
  }

  public onSubmit(): void {
    const project_id = +this.addHoursForm.get('project').value;
    const task: ITask = {
      name: this.addHoursForm.get('task').value,
      description: this.addHoursForm.get('description').value,
      createdAt: new Date(),
      time: {
        hours: +this.addHoursForm.get('time.hours').value,
        minutes: +this.addHoursForm.get('time.minutes').value,
      },
    };
    this.attendanceService.addTaskToProject(task, project_id);
  }

  // Validation
  public getTimePeriodErrorMessage(): String {
    const hours = this.addHoursForm.get('time.hours');
    const minutes = this.addHoursForm.get('time.minutes');
    if (hours.errors?.['endDateEqualsNull']) {
      return 'Закончите выбор периода дат';
    }
    if (hours.errors?.['periodExceedsMaxValue']) {
      return 'Превышено максимальное время для выбранного периода';
    }
    if (minutes.errors?.['invalidMinutes']) {
      return 'Введите корректные минуты';
    }
    return 'Введите корретные периоды дат и времени';
  }

  // public timeValidator (control: AbstractControl): {[key: string]: any} | null {
  //   // todo переделать сётчик времени на функцию с параметрами период дат, часы в день
  //   const maxPossibleHours = +this.attendanceService.countRecommendedTime(this.attendanceService.datePeriod$.getValue()).hours * 3;
  //   return +control.value < maxPossibleHours
  //     ? null
  //     : {'periodExceedsMaxValue': true}
  // }

  public minutesValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    return control.value < 60 ? null : { invalidMinutes: true };
  }

  public datePeriodValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    return this.attendanceService.datePeriod$.getValue().endDate
      ? null
      : { endDateEqualsNull: true };
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  // todo переделать сётчик времени на функцию с параметрами период дат, часы в день
  // todo очищать форму после сабита (часы ставить опять рекомендованные)
}
