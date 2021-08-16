import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';

import { AttendanceService } from '@app/services/attendance.service';
import { DateService } from '@app/services/date.service';
import { DateFilterFn } from '@angular/material/datepicker';
import { ProjectInfo } from '@data/api/user-service/models/project-info';
import { ILeaveType, LeaveTimeModel } from '@app/models/leave-time.model';
import { CreateWorkTimeRequest } from '@data/api/time-service/models/create-work-time-request';
import { CreateLeaveTimeRequest } from '@data/api/time-service/models/create-leave-time-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OperationResultResponse } from '@data/api/time-service/models/operation-result-response';
import { TimeService } from '@app/services/time/time.service';
import { UserService } from '@app/services/user/user.service';
import { timeValidator } from './add-hours.validators';

@Component({
	selector: 'do-add-hours',
	templateUrl: './add-hours.component.html',
	styleUrls: ['./add-hours.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddHoursComponent implements OnInit, OnDestroy {
	public projects: ProjectInfo[] | undefined;
	public absences: ILeaveType[];
	public addHoursForm: FormGroup;
	public isProjectForm: boolean;
	public monthOptions: Date[];
	public isBeginningOfMonth: boolean;

	private readonly userId: string | undefined;
	private onDestroy$: ReplaySubject<any> = new ReplaySubject<any>(1);

	constructor(
		private _fb: FormBuilder,
		private _attendanceService: AttendanceService,
		private _dateService: DateService,
		private _timeService: TimeService,
		private _userService: UserService,
		private _snackbar: MatSnackBar
	) {
		this.isProjectForm = true;
		this.absences = LeaveTimeModel.getAllLeaveTypes();
		this.addHoursForm = this._fb.group({
			time: ['', [Validators.required, Validators.min(1), timeValidator(() => this._countMaxHours())]],
			date: [new Date(), Validators.required],
			activity: ['', Validators.required],
			comment: [''],
		});
		const currentUser = _userService.getCurrentUser();
		this.projects = currentUser?.projects;
		this.userId = currentUser?.id;
		this.monthOptions = this._getMonthOptions();
		this.isBeginningOfMonth = this._canAddTimeToPreviousMonth();
	}

	ngOnInit() {}

	get startDate(): Date | null | undefined {
		return this._attendanceService.datePeriod.startDate;
	}

	get endDate(): Date | null | undefined {
		return this._attendanceService.datePeriod.endDate;
	}

	private _getMonthOptions(): Date[] {
		const currentMonth = new Date();
		return [currentMonth, new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)];
	}

	private _canAddTimeToPreviousMonth(): boolean {
		return new Date().getMonth() < 5;
	}

	public setMonthToAddTimeTo(date: Date): void {
		this.addHoursForm.get('date')?.setValue(date);
	}

	public getLastDayOfMonth(): Date | null {
		return this.startDate ? new Date(2021, this.startDate.getMonth() + 1, 0) : null;
	}

	private _countMaxHours(): number {
		const currentDatePeriod = this._attendanceService.datePeriod;
		return Number(this._attendanceService.getRecommendedTime(currentDatePeriod, 24).hours);
	}

	public onSubmit(): void {
		console.log(this.addHoursForm.value);
		let timeService: Observable<OperationResultResponse>;

		if (this.isProjectForm) {
			const addWorkTime: CreateWorkTimeRequest = {
				userId: this.userId,
				startTime: this.startDate?.toISOString(),
				endTime: this.endDate?.toISOString(),
				minutes: this.addHoursForm.get('time')?.value,
				projectId: this.addHoursForm.get('activity')?.value,
				title: this.addHoursForm.get('task')?.value,
				description: this.addHoursForm.get('description')?.value,
			};
			timeService = this._timeService.addWorkTime(addWorkTime);
		} else {
			const addLeaveTime: CreateLeaveTimeRequest = {
				userId: this.userId,
				startTime: this.startDate.toISOString(),
				endTime: this.endDate.toISOString(),
				minutes: this._countMaxHours(),
				leaveType: this.addHoursForm.get('activity')?.value,
				comment: this.addHoursForm.get('description')?.value,
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
		this.isProjectForm = true;
		this.addHoursForm.get('time')?.enable();
	}

	public getTimePeriodErrorMessage(): string {
		// const hours = this.addHoursForm.get('time.hours');
		// const minutes = this.addHoursForm.get('time.minutes');
		//
		// if (hours.hasError('periodExceedsMaxValue')) {
		// 	return 'Превышено максимальное время для выбранного периода';
		// }
		// if (minutes.hasError('max')) {
		// 	return 'Введите корректные минуты';
		// }
		// return 'Введите корретный период времени';
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
		this.addHoursForm.get('time')?.patchValue(this._countMaxHours());
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
