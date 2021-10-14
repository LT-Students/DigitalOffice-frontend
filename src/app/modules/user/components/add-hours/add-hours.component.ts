import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { AttendanceService } from '@app/services/attendance.service';
import { DateService } from '@app/services/date.service';
import { DateFilterFn } from '@angular/material/datepicker';
import { ILeaveType, LeaveTypeModel } from '@app/models/time/leave-type.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICreateLeaveTimeRequest, IEditWorkTimeRequest } from '@app/services/time/time.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { OperationResultResponse, WorkTimeInfo } from '@data/api/time-service/models';
import { DatePeriod } from '@app/types/date-period';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionSelectionChange } from '@angular/material/core';
import { DateTime } from 'luxon';
import { RANGE_DATE_FORMAT } from '@app/configs/date-formats';
import { LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS } from '@angular/material-luxon-adapter';
import { timeValidator } from './add-hours.validators';

@Component({
	selector: 'do-add-hours',
	templateUrl: './add-hours.component.html',
	styleUrls: ['./add-hours.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: DateAdapter,
			useClass: LuxonDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS],
		},
		{ provide: MAT_DATE_FORMATS, useValue: RANGE_DATE_FORMAT },
	],
})
export class AddHoursComponent implements OnDestroy {
	public workTimes$: Observable<Array<WorkTimeInfo | undefined> | undefined>;
	public selectedDate$: Observable<DateTime>;
	public recommendedTime: BehaviorSubject<number>;

	public absences: ILeaveType[];
	public addHoursForm: FormGroup;
	public isProjectForm: boolean;
	public monthOptions: DateTime[];
	public disableWeekends: DateFilterFn<DateTime>;
	private _canEditSubscription: Subscription;
	public minDate: DateTime;
	public maxDate: DateTime;

	constructor(
		private _fb: FormBuilder,
		private _attendanceService: AttendanceService,
		private _dateService: DateService,
		private _snackbar: MatSnackBar
	) {
		[this.minDate, this.maxDate] = this._attendanceService.getCalendarMinMax();

		this.isProjectForm = true;
		this.monthOptions = [];
		this.absences = LeaveTypeModel.getAllLeaveTypes();
		this.disableWeekends = this._attendanceService.disableWeekends;

		this.addHoursForm = this._fb.group({
			time: [
				'',
				[Validators.required, Validators.min(1), timeValidator(() => this._attendanceService.countMaxHours())],
			],
			startDate: [DateTime.now(), [Validators.required]],
			endDate: [DateTime.now(), [Validators.required]],
			activity: [null, Validators.required],
			comment: [null],
		});

		this.recommendedTime = new BehaviorSubject<number>(0);
		this.workTimes$ = this._attendanceService.activities$.pipe(map((activities) => activities.projects));
		this.selectedDate$ = this._attendanceService.selectedDate$.pipe(
			tap((date) => {
				this.monthOptions = this._setMonthOptions(date);
			})
		);
		this._canEditSubscription = this._attendanceService.canEdit$.subscribe({
			next: (canEdit) => {
				if (canEdit) {
					this.addHoursForm.enable();
				} else {
					this.addHoursForm.disable();
				}
			},
		});
	}

	public changeDate(date: DateTime): void {
		this._attendanceService.setNewDate(date);
	}

	private _setMonthOptions(selectedDate: DateTime): DateTime[] {
		if (selectedDate.day < 5 && selectedDate.month === DateTime.now().month) {
			const currentDate = DateTime.now();
			return [currentDate, currentDate.minus({ months: 1 })];
		} else if (selectedDate.month < DateTime.now().month || selectedDate.year !== DateTime.now().year) {
			return [DateTime.now()];
		}
		return [];
	}

	public patchWorkTimeInfoIntoForm(workTime: WorkTimeInfo | undefined, event: MatOptionSelectionChange): void {
		if (event.isUserInput && workTime) {
			if (this.addHoursForm.get('time')?.value !== '') {
				this.addHoursForm.patchValue({
					comment: workTime.description,
				});
			} else {
				this.addHoursForm.patchValue({
					time: workTime.userHours,
					comment: workTime.description,
				});
			}
		}
	}

	public toggleFormType(isProjectForm: boolean): void {
		this.isProjectForm = isProjectForm;
		this.recommendedTime.next(0);
		const validators = isProjectForm
			? [Validators.required, Validators.min(1), timeValidator(() => this._attendanceService.countMaxHours())]
			: [];
		this.addHoursForm.get('time')?.setValidators(validators);
		this.addHoursForm.get('time')?.updateValueAndValidity();
		this.addHoursForm.reset();
	}

	public onSubmit(): void {
		const sendRequest = this.isProjectForm ? this._editWorkTime() : this._addLeaveTime();

		sendRequest.pipe(switchMap(() => this._attendanceService.getActivities())).subscribe(
			() => {
				this._snackbar.open('Запись успешно добавлена!', 'Закрыть', { duration: 5000 });
				this.addHoursForm.reset();
				this.isProjectForm = true;
			},
			(error) => {
				this._snackbar.open(error.error.Message, 'Закрыть', { duration: 5000 });
				throw error;
			}
		);
	}

	private _editWorkTime(): Observable<OperationResultResponse> {
		const workTimeRequest: IEditWorkTimeRequest = {
			workTimeId: this.addHoursForm.get('activity')?.value,
			body: [
				{ op: 'replace', path: '/UserHours', value: this.addHoursForm.get('time')?.value },
				{ op: 'replace', path: '/Description', value: this.addHoursForm.get('comment')?.value },
			],
		};

		return this._attendanceService.editWorkTime(workTimeRequest);
	}

	private _addLeaveTime(): Observable<OperationResultResponse> {
		const timeZoneOffset = (this.addHoursForm.get('startDate')?.value as DateTime).offset;
		const leaveTimeRequest: Omit<ICreateLeaveTimeRequest, 'userId'> = {
			startTime: this.addHoursForm.get('startDate')?.value.plus({ minutes: timeZoneOffset }).toISO(),
			endTime: this.addHoursForm.get('endDate')?.value.plus({ minutes: timeZoneOffset }).toISO(),
			leaveType: this.addHoursForm.get('activity')?.value,
			comment: this.addHoursForm.get('comment')?.value,
			minutes: this.recommendedTime.value * 60,
		};

		return this._attendanceService.addLeaveTime(leaveTimeRequest);
	}

	public onClose(): void {
		const startDateValue: DateTime = this.addHoursForm.get('startDate')?.value;
		const endDateControl = this.addHoursForm.get('endDate');
		if (!endDateControl?.value || startDateValue.startOf('day').equals(endDateControl.value.startOf('day'))) {
			endDateControl?.setValue(startDateValue.endOf('day'));
		}

		const datePeriod: DatePeriod = {
			startDate: startDateValue,
			endDate: endDateControl?.value,
		};
		console.log(this._attendanceService.getLeaveDuration(datePeriod));
		this.recommendedTime.next(this._attendanceService.getLeaveDuration(datePeriod));
	}

	public ngOnDestroy(): void {
		this._canEditSubscription.unsubscribe();
	}
}
