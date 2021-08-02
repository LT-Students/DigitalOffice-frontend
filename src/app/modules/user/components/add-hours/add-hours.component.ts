import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Time } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';

import { AttendanceService } from '@app/services/attendance.service';
import { ProjectStore } from '@data/store/project.store';
import { DayOfWeek } from '@data/models/day-of-week';
import { DateService } from '@app/services/date.service';
import { DateFilterFn } from '@angular/material/datepicker';
import { ProjectInfo } from '@data/api/user-service/models/project-info';
import { WorkTimeApiService } from '@data/api/time-service/services/work-time-api.service';
import { LeaveTimeApiService } from '@data/api/time-service/services/leave-time-api.service';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ILeaveType, LeaveTimeModel } from '@app/models/leave-time.model';
import { CreateWorkTimeRequest } from '@data/api/time-service/models/create-work-time-request';
import { CreateLeaveTimeRequest } from '@data/api/time-service/models/create-leave-time-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OperationResultResponse } from '@data/api/time-service/models/operation-result-response';
import { Task } from '@app/models/task.model';
import { User } from '@app/models/user/user.model';
import { timeValidator } from './add-hours.validators';

@Component({
	selector: 'do-add-hours',
	templateUrl: './add-hours.component.html',
	styleUrls: ['./add-hours.component.scss'],
})
export class AddHoursComponent implements OnInit, OnDestroy {
	@Input() user: User;
	private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);

	public projects: ProjectInfo[];
	public absences: ILeaveType[];
	public addHoursForm: FormGroup;
	public setTimePeriod: Time;

	public startDate: Date | null;
	public endDate: Date | null;
	public daysOfWeek: DayOfWeek[];
	private tempStartDate: Date;

	constructor(
		private fb: FormBuilder,
		private attendanceService: AttendanceService,
		private projectStore: ProjectStore,
		private dateService: DateService,
		private workTimeService: WorkTimeApiService,
		private leaveTimeService: LeaveTimeApiService,
		private snackbar: MatSnackBar
	) {
		this.startDate = this.attendanceService.datePeriod.startDate;
		this.endDate = this.attendanceService.datePeriod.endDate;
		this.daysOfWeek = this.dateService.getWeek(this.endDate);

		this.projects = this.projectStore.projects;

		this.absences = LeaveTimeModel.getAllLeaveTypes();
	}

	ngOnInit() {
		this.addHoursForm = this.fb.group({
			time: [24, [Validators.required, timeValidator(() => this._countMaxHours())]],
			// time: this.fb.group({
			// 	hours: ['', [Validators.required, timeValidator(() => this.getHours())]],
			// 	minutes: ['', [Validators.required, Validators.max(59)]],
			// }),
			isProject: [true, Validators.required],
			activity: ['', Validators.required],
			task: ['', Validators.required],
			description: [''],
		});

		this.projects = this.user.projects;
		console.log(this.user);

		// this.attendanceService.recommendedTime$.pipe(takeUntil(this.onDestroy$)).subscribe((timePeriod) => {
		// 	this.setTimePeriod = timePeriod;
		// 	this.addHoursForm.get('time.hours').setValue(this.attendanceService.normalizeTime(timePeriod.hours));
		// 	this.addHoursForm.get('time.minutes').setValue(this.attendanceService.normalizeTime(timePeriod.minutes));
		// });
	}

	public setTypeOfForm(event: MatOptionSelectionChange): void {
		if (event.isUserInput) {
			const isProjectControl = this.addHoursForm.get('isProject');
			const taskControl = this.addHoursForm.get('task');
			if (event.source.group.label === 'Проекты') {
				isProjectControl.setValue(true);
				taskControl.setValidators([Validators.required]);
			} else {
				isProjectControl.setValue(false);
				taskControl.clearValidators();
			}
			taskControl.updateValueAndValidity();
		}
	}

	public isProjectForm() {
		return this.addHoursForm.get('isProject').value as boolean;
	}

	public getLastDayOfMonth(): Date | null {
		let lastDay: Date = null;
		if (this.startDate) {
			lastDay = new Date(2021, this.startDate.getMonth() + 1, 0);
		}

		return lastDay;
	}

	private _countMaxHours(): number {
		const currentDatePeriod = this.attendanceService.datePeriod;
		return Number(this.attendanceService.getRecommendedTime(currentDatePeriod, 24).hours) * 60;
	}

	public onSubmit(): void {
		console.log(this.addHoursForm.value);
		let timeService: Observable<OperationResultResponse>;

		if (this.addHoursForm.get('isProject').value as boolean) {
			const addWorkTime: CreateWorkTimeRequest = {
				//TODO fix user service
				userId: this.user.user.id,
				startTime: this.startDate.toISOString(),
				endTime: this.endDate.toISOString(),
				minutes: this.addHoursForm.get('time').value,
				projectId: this.addHoursForm.get('activity').value,
				title: this.addHoursForm.get('task').value,
				description: this.addHoursForm.get('description').value,
			};
			timeService = this.workTimeService.addWorkTime({ body: addWorkTime });
		} else {
			const addLeaveTime: CreateLeaveTimeRequest = {
				userId: this.user.user.id,
				startTime: this.startDate.toISOString(),
				endTime: this.endDate.toISOString(),
				minutes: this.addHoursForm.get('time').value,
				leaveType: this.addHoursForm.get('activity').value,
				comment: this.addHoursForm.get('description').value,
			};
			timeService = this.leaveTimeService.addLeaveTime({ body: addLeaveTime });
		}

		timeService.subscribe(
			(result) => {
				this.snackbar.open('Запись успешно добавлена!', 'Закрыть', { duration: 5000 });
			},
			(error) => {
				this.snackbar.open(error.error.Message, 'Закрыть', { duration: 5000 });
				throw error;
			}
		);
		this.addHoursForm.reset();
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

	public disableWeekends: DateFilterFn<unknown> = (d: Date | null): boolean => {
		const day = (d || new Date()).getDay();
		return day !== 0 && day !== 6;
	};

	public onClose(): void {
		const datePeriod = this.attendanceService.datePeriod;
		if (!datePeriod.endDate) {
			const oneDayPeriod = {
				startDate: datePeriod.startDate,
				endDate: datePeriod.startDate,
			};
			this.attendanceService.onDatePeriodChange(oneDayPeriod);
		}
	}

	public onDateInput(date: Date | null, isStartDate: boolean): void {
		if (date) {
			if (isStartDate) {
				this.attendanceService.onDatePeriodChange({
					startDate: date,
					endDate: null,
				});
				this.daysOfWeek = this.dateService.getWeek(date);
				this.tempStartDate = date;
				this.startDate = date;
			} else {
				this.attendanceService.onDatePeriodChange({
					startDate: this.tempStartDate,
					endDate: date,
				});
				this.endDate = date;
			}
		}
	}

	ngOnDestroy() {
		this.onDestroy$.next(null);
		this.onDestroy$.complete();
	}
}
