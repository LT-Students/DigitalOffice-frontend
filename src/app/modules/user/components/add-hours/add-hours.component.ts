import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { AttendanceService } from '@app/services/attendance.service';
import { DateService } from '@app/services/date.service';
import { DateFilterFn } from '@angular/material/datepicker';
import { ILeaveType, LeaveTimeModel } from '@app/models/leave-time.model';
import { CreateLeaveTimeRequest } from '@data/api/time-service/models/create-leave-time-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IEditWorkTimeRequest } from '@app/services/time/time.service';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { OperationResultResponse, WorkTimeInfo } from '@data/api/time-service/models';
import { DatePeriod } from '@data/models/date-period';
import { MatOptionSelectionChange } from '@angular/material/core';
import { timeValidator } from './add-hours.validators';
import { TimeDurationService } from '@app/services/time-duration.service';

@Component({
	selector: 'do-add-hours',
	templateUrl: './add-hours.component.html',
	styleUrls: ['./add-hours.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddHoursComponent implements OnDestroy {
	public workTimes$: Observable<Array<WorkTimeInfo | undefined> | undefined>;
	public selectedDate$: Observable<Date>;
	public recommendedTime: BehaviorSubject<number>;

	public absences: ILeaveType[];
	public addHoursForm: FormGroup;
	public isProjectForm: boolean;
	public monthOptions: Date[];
	public disableWeekends: DateFilterFn<Date>;
	private _canEditSubscription: Subscription;
	public minDate: Date;
	public maxDate: Date;

	public loading: boolean;

	constructor(
		private _fb: FormBuilder,
		private _attendanceService: AttendanceService,
		private _dateService: DateService,
		private _snackbar: MatSnackBar,
		private _timeDurationService: TimeDurationService
	) {
		this.loading = false;

		[this.minDate, this.maxDate] = this._attendanceService.getCalendarMinMax();

		this.isProjectForm = true;
		this.monthOptions = [];
		this.absences = LeaveTimeModel.getAllLeaveTypes();
		this.disableWeekends = this._attendanceService.disableWeekends;

		this.addHoursForm = this._fb.group({
			time: [null, [Validators.required, Validators.min(1), timeValidator(() => this._attendanceService.countMaxHours())]],
			startDate: [new Date(), [Validators.required]],
			endDate: [new Date(), [Validators.required]],
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

	public changeDate(date: Date): void {
		this._attendanceService.setNewDate(date);

	}

	private _setMonthOptions(selectedDate: Date): Date[] {
		if (selectedDate.getDate() < 5 && selectedDate.getMonth() === new Date().getMonth()) {
			const currentDate = new Date();
			return [currentDate, new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)];
		} else if (selectedDate.getMonth() < new Date().getMonth() || selectedDate.getFullYear() !== new Date().getFullYear()) {
			return [new Date()];
		}
		return [];
	}

	public patchWorkTimeInfoIntoForm(workTime: WorkTimeInfo | undefined, event: MatOptionSelectionChange): void {
		if (event.isUserInput && workTime) {
			this.addHoursForm.patchValue({
				time: workTime.userHours,
				comment: workTime.description,
			});
		}
	}

	public toggleFormType(isProjectForm: boolean): void {
		this.isProjectForm = isProjectForm;
		const validators = isProjectForm
			? [Validators.required, Validators.min(1), timeValidator(() => this._attendanceService.countMaxHours())]
			: [];
		this.addHoursForm.get('time')?.setValidators(validators);
		this.addHoursForm.get('time')?.updateValueAndValidity();
		this.addHoursForm.reset();
	}

	public onSubmit(): void {
		const sendRequest = this.isProjectForm ? this._editWorkTime() : this._addLeaveTime();
		this.loading = true;

		sendRequest.pipe(switchMap(() => this._attendanceService.getActivities())).subscribe(
			() => {
				this._snackbar.open('Запись успешно добавлена!', 'Закрыть', { duration: 5000 });
				this.addHoursForm.reset();
				this.isProjectForm = true;
				this.loading = false;
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
		const leaveTimeRequest: Omit<CreateLeaveTimeRequest, 'userId'> = {
			startTime: this.addHoursForm.get('startDate')?.value.toISOString(),
			endTime: this.addHoursForm.get('endDate')?.value.toISOString(),
			leaveType: this.addHoursForm.get('activity')?.value,
			comment: this.addHoursForm.get('comment')?.value,
		};

		return this._attendanceService.addLeaveTime(leaveTimeRequest);
	}

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
		this.recommendedTime.next(this._timeDurationService.getDuration(datePeriod, 8, true));
	}

	public ngOnDestroy(): void {
		this._canEditSubscription.unsubscribe();
	}
}
