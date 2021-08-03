import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';

import { AttendanceService } from '@app/services/attendance.service';
import { DateService } from '@app/services/date.service';
import { DateFilterFn } from '@angular/material/datepicker';
import { ProjectInfo } from '@data/api/user-service/models/project-info';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ILeaveType, LeaveTimeModel } from '@app/models/leave-time.model';
import { CreateWorkTimeRequest } from '@data/api/time-service/models/create-work-time-request';
import { CreateLeaveTimeRequest } from '@data/api/time-service/models/create-leave-time-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OperationResultResponse } from '@data/api/time-service/models/operation-result-response';
import { TimeService } from '@app/services/time/time.service';
import { timeValidator } from './add-hours.validators';

@Component({
	selector: 'do-add-hours',
	templateUrl: './add-hours.component.html',
	styleUrls: ['./add-hours.component.scss'],
})
export class AddHoursComponent implements OnInit, OnDestroy {
	@Input() userId: string;
	@Input() projects: ProjectInfo[];
	private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);

	public absences: ILeaveType[];
	public addHoursForm: FormGroup;

	public isProjectForm: boolean;

	constructor(
		private _fb: FormBuilder,
		private _attendanceService: AttendanceService,
		private _dateService: DateService,
		private _timeService: TimeService,
		private _snackbar: MatSnackBar
	) {
		this.isProjectForm = true;
		this.absences = LeaveTimeModel.getAllLeaveTypes();
	}

	ngOnInit() {
		this.addHoursForm = this._fb.group({
			time: [ 24, [Validators.required, timeValidator(() => this._countMaxHours())]],
			// time: this.fb.group({
			// 	hours: ['', [Validators.required, timeValidator(() => this.getHours())]],
			// 	minutes: ['', [Validators.required, Validators.max(59)]],
			// }),
			activity: ['', Validators.required],
			task: ['', Validators.required],
			description: [''],
		});

		// this.attendanceService.recommendedTime$.pipe(takeUntil(this.onDestroy$)).subscribe((timePeriod) => {
		// 	this.setTimePeriod = timePeriod;
		// 	this.addHoursForm.get('time.hours').setValue(this.attendanceService.normalizeTime(timePeriod.hours));
		// 	this.addHoursForm.get('time.minutes').setValue(this.attendanceService.normalizeTime(timePeriod.minutes));
		// });
	}

	get startDate(): Date {
		return this._attendanceService.datePeriod.startDate;
	}

	get endDate(): Date {
		return this._attendanceService.datePeriod.endDate;
	}

	public setFormType(event: MatOptionSelectionChange): void {
		if (event.isUserInput) {
			const taskControl = this.addHoursForm.get('task');
			if (event.source.group.label === 'Проекты') {
				taskControl.setValidators([Validators.required]);
			} else {
				taskControl.clearValidators();
			}
			this._toggleFormType();
			taskControl.updateValueAndValidity();
		}
	}

	private _toggleFormType() {
		const timeControl = this.addHoursForm.get('time');
		if (this.isProjectForm) {
			this.isProjectForm = false;
			timeControl.disable();
		} else {
			this.isProjectForm = true;
			timeControl.enable();
		}
	}

	public getLastDayOfMonth(): Date | null {
		let lastDay: Date = null;
		if (this.startDate) {
			lastDay = new Date(2021, this.startDate.getMonth() + 1, 0);
		}

		return lastDay;
	}

	private _countMaxHours(): number {
		const currentDatePeriod = this._attendanceService.datePeriod;
		return Number(this._attendanceService.getRecommendedTime(currentDatePeriod, 24).hours) * 60;
	}

	public onSubmit(): void {
		console.log(this.addHoursForm.value);
		let timeService: Observable<OperationResultResponse>;

		if (this.isProjectForm) {
			const addWorkTime: CreateWorkTimeRequest = {
				userId: this.userId,
				startTime: this.startDate.toISOString(),
				endTime: this.endDate.toISOString(),
				minutes: this.addHoursForm.get('time').value,
				projectId: this.addHoursForm.get('activity').value,
				title: this.addHoursForm.get('task').value,
				description: this.addHoursForm.get('description').value,
			};
			timeService = this._timeService.addWorkTime(addWorkTime);
		} else {
			const addLeaveTime: CreateLeaveTimeRequest = {
				userId: this.userId,
				startTime: this.startDate.toISOString(),
				endTime: this.endDate.toISOString(),
				minutes: this.addHoursForm.get('time').value,
				leaveType: this.addHoursForm.get('activity').value,
				comment: this.addHoursForm.get('description').value,
			};
			timeService = this._timeService.addLeaveTime(addLeaveTime);
		}

		timeService.subscribe(
			(result) => {
				this._snackbar.open('Запись успешно добавлена!', 'Закрыть', { duration: 5000 });
			},
			(error) => {
				this._snackbar.open(error.error.Message, 'Закрыть', { duration: 5000 });
				throw error;
			}
		);
		this.addHoursForm.reset();
		this._toggleFormType();
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
		const datePeriod = this._attendanceService.datePeriod;
		if (!datePeriod.endDate) {
			const oneDayPeriod = {
				startDate: datePeriod.startDate,
				endDate: datePeriod.startDate,
			};
			this._attendanceService.onDatePeriodChange(oneDayPeriod);
		}
	}

	public onStartDateChange(date: Date | null): void {
		if (date) {
			this._attendanceService.onDatePeriodChange({
				startDate: date,
				endDate: null,
			});
		}
	}

	public onEndDateChange(date: Date | null): void {
		if (date) {
			this._attendanceService.onDatePeriodChange({
				startDate: this.startDate,
				endDate: date,
			});
		}
	}

	ngOnDestroy() {
		this.onDestroy$.next(null);
		this.onDestroy$.complete();
	}
}
