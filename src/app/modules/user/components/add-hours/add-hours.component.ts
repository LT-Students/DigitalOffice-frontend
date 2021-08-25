import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AttendanceService } from '@app/services/attendance.service';
import { DateService } from '@app/services/date.service';
import { DateFilterFn } from '@angular/material/datepicker';
import { ILeaveType, LeaveTimeModel } from '@app/models/leave-time.model';
import { CreateLeaveTimeRequest } from '@data/api/time-service/models/create-leave-time-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OperationResultResponse } from '@data/api/time-service/models/operation-result-response';
import { IEditWorkTimeRequest, TimeService } from '@app/services/time/time.service';
import { UserService } from '@app/services/user/user.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { WorkTimeInfo } from '@data/api/time-service/models';
import { DatePeriod } from '@data/models/date-period';
import { timeValidator } from './add-hours.validators';

@Component({
	selector: 'do-add-hours',
	templateUrl: './add-hours.component.html',
	styleUrls: ['./add-hours.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddHoursComponent implements OnInit {
	public workTimes$: Observable<WorkTimeInfo[] | undefined>;
	public absences: ILeaveType[];
	public addHoursForm: FormGroup;
	public isProjectForm: boolean;
	public currentDate: Date;
	public monthOptions: [Date, Date] | null;
	public isBeginningOfMonth: boolean;
	public recommendedTime: number;

	private _userId: string | undefined;

	constructor(
		private _fb: FormBuilder,
		private _attendanceService: AttendanceService,
		private _dateService: DateService,
		private _timeService: TimeService,
		private _userService: UserService,
		private _snackbar: MatSnackBar
	) {
		this.currentDate = new Date();
		this.recommendedTime = _attendanceService.getRecommendedTime(_dateService.getDefaultDatePeriod(), 8, true);
		this.isProjectForm = true;
		this.absences = LeaveTimeModel.getAllLeaveTypes();
		this.isBeginningOfMonth = this._canAddTimeToPreviousMonth();
		this.monthOptions = this.isBeginningOfMonth ? this._getMonthOptions() : null;

		this.addHoursForm = this._fb.group({
			time: ['', [Validators.required, Validators.min(1), timeValidator(() => this._countMaxHours())]],
			startDate: [new Date(), [Validators.required]],
			endDate: [new Date(), [Validators.required]],
			activity: ['', Validators.required],
			comment: [''],
		});

		this.workTimes$ = this._userService.currentUser$.pipe(
			tap((user) => (this._userId = user?.id)),
			switchMap(() => this._attendanceService.activities$),
			map((activities) => activities.projects)
		);
	}

	ngOnInit() {}

	private _getWorkTimes(month: number): void {
		this._attendanceService.getActivities(this._userId, month).pipe(
			map((activities) => activities.projects),
			switchMap((projects) => of(projects))
		);
	}

	private _getMonthOptions(): [Date, Date] {
		return [this.currentDate, new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1)];
	}

	private _canAddTimeToPreviousMonth(): boolean {
		return new Date().getDate() < 5;
	}

	public setMonthToAddTimeTo(date: Date): void {
		if (!this._dateService.isSameMonth(this.currentDate, date)) {
			this.currentDate = date;
			this._getWorkTimes(date.getMonth());
		}
	}

	public patchWorkTimeInfoIntoForm(workTime: WorkTimeInfo): void {
		this.addHoursForm.patchValue({
			time: workTime.userHours,
			comment: workTime.description,
		});
	}

	public toggleFormType(isProjectForm: boolean): void {
		const timeControl = this.addHoursForm.get('time');
		if (isProjectForm) {
			timeControl?.setValidators([Validators.required, Validators.min(1), timeValidator(() => this._countMaxHours())]);
		} else {
			timeControl?.clearValidators();
		}
		timeControl?.updateValueAndValidity();
		this.isProjectForm = isProjectForm;
		const { startDate, endDate } = this._dateService.getDefaultDatePeriod();
		this.addHoursForm.reset({ startDate, endDate });
	}

	private _countMaxHours(): number {
		const currentDatePeriod: DatePeriod = {
			startDate: new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1),
			endDate: new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0),
		};
		return Number(this._attendanceService.getRecommendedTime(currentDatePeriod, 24));
	}

	public onSubmit(): void {
		console.log(this.addHoursForm.value);
		let timeService: Observable<OperationResultResponse>;

		if (this.isProjectForm) {
			const addWorkTime: IEditWorkTimeRequest = {
				workTimeId: this.addHoursForm.get('activity')?.value,
				body: [
					{ op: 'replace', path: '/UserHours', value: this.addHoursForm.get('time')?.value },
					{ op: 'replace', path: '/Description', value: this.addHoursForm.get('comment')?.value },
				],
			};
			timeService = this._timeService.editWorkTime(addWorkTime);
		} else {
			const addLeaveTime: CreateLeaveTimeRequest = {
				userId: this._userId as string,
				startTime: this.addHoursForm.get('startDate')?.value.toISOString(),
				endTime: this.addHoursForm.get('endDate')?.value.toISOString(),
				leaveType: this.addHoursForm.get('activity')?.value,
				comment: this.addHoursForm.get('comment')?.value,
			};
			timeService = this._timeService.addLeaveTime(addLeaveTime);
		}

		timeService.subscribe(
			() => {
				this._snackbar.open('Запись успешно добавлена!', 'Закрыть', { duration: 5000 });
				const { startDate, endDate } = this._dateService.getDefaultDatePeriod();
				this.addHoursForm.reset({ startDate, endDate });
				this.addHoursForm.markAsPristine();
				this.isProjectForm = true;
			},
			(error) => {
				this._snackbar.open(error.error.Message, 'Закрыть', { duration: 5000 });
				throw error;
			}
		);
	}

	public disableWeekends: DateFilterFn<Date> = (d: Date | null): boolean => {
		const day = (d || new Date()).getDay();
		return day !== 0 && day !== 6;
	};

	public onClose(): void {
		const startDateValue = this.addHoursForm.get('startDate')?.value;
		const endDateControl = this.addHoursForm.get('endDate');
		if (!endDateControl?.value || this._dateService.isSameDay(startDateValue, endDateControl.value)) {
			endDateControl?.setValue(new Date(startDateValue.getTime() + 1));
		}

		const datePeriod: DatePeriod = {
			startDate: startDateValue,
			endDate: endDateControl?.value,
		};
		this.recommendedTime = this._attendanceService.getRecommendedTime(datePeriod, 8, true);
	}
}
