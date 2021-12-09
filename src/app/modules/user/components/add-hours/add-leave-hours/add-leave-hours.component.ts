import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { BehaviorSubject, Observable } from 'rxjs';
import { AttendanceService } from '@app/services/attendance.service';
import { OperationResultResponse } from '@data/api/time-service/models/operation-result-response';
import { ICreateLeaveTimeRequest } from '@app/services/time/time.service';
import { DatePeriod } from '@app/types/date-period';
import { DateFilterFn } from '@angular/material/datepicker';
import { ILeaveType, LeaveTypeModel } from '@app/models/time/leave-type.model';
import { finalize, switchMap } from 'rxjs/operators';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { RANGE_DATE_FORMAT } from '@app/configs/date-formats';
import { LeaveType } from '@data/api/time-service/models';

export interface ITooltip {
	disabled: boolean;
	message?: string;
}

@Component({
	selector: 'do-add-leave-hours',
	templateUrl: './add-leave-hours.component.html',
	styleUrls: ['./add-leave-hours.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MAT_DATE_FORMATS, useValue: RANGE_DATE_FORMAT }],
})
export class AddLeaveHoursComponent {
	public addLeaveForm: FormGroup;

	public loading$$: BehaviorSubject<boolean>;

	public currentDate: DateTime;
	public minDate: DateTime;
	public recommendedTime$$: BehaviorSubject<number>;
	public disableWeekends: DateFilterFn<DateTime>;
	public tooltip: ITooltip;

	public absences: ILeaveType[];

	constructor(
		private _fb: FormBuilder,
		private _attendanceService: AttendanceService,
		private _responseService: ResponseMessageModel
	) {
		this.loading$$ = new BehaviorSubject<boolean>(false);
		this.recommendedTime$$ = new BehaviorSubject<number>(0);
		this.tooltip = { disabled: true };
		this.disableWeekends = this._attendanceService.disableWeekends;
		this.absences = LeaveTypeModel.getAllLeaveTypes();
		this.currentDate = DateTime.local();

		this.addLeaveForm = this._fb.group({
			leaveType: [null, [Validators.required]],
			startDate: [null, [Validators.required]],
			endDate: [null, [Validators.required]],
			comment: [null],
		});
		this.addLeaveForm.get('leaveType')?.valueChanges.subscribe(() => {
			this.addHoursToAbsenceValidation();
		});

		[this.minDate] = this._attendanceService.getCalendarMinMax();
	}

	public onClose(): void {
		const startDateValue: DateTime = this.addLeaveForm.get('startDate')?.value;
		const endDateControl = this.addLeaveForm.get('endDate');
		if (!endDateControl?.value || startDateValue.startOf('day').equals(endDateControl.value.startOf('day'))) {
			endDateControl?.setValue(startDateValue.endOf('day'));
		}

		const datePeriod: DatePeriod = {
			startDate: startDateValue,
			endDate: endDateControl?.value,
		};

		this.recommendedTime$$.next(this._attendanceService.getLeaveDuration(datePeriod));
		if (this.addLeaveForm.get('leaveType')?.value) {
			this.addHoursToAbsenceValidation();
		}
	}

	public onSubmit(): void {
		this.loading$$.next(true);
		this._addLeaveTime()
			.pipe(
				this._responseService.message(MessageTriggeredFrom.LeaveTime, MessageMethod.Create),
				switchMap(() => this._attendanceService.getActivities()),
				finalize(() => {
					this.loading$$.next(false);
				})
			)
			.subscribe(() => {
				this.addLeaveForm.reset();
			});
	}

	private _addLeaveTime(): Observable<OperationResultResponse> {
		const timeZoneOffset = (this.addLeaveForm.get('startDate')?.value as DateTime).offset;
		const leaveTimeRequest: Omit<ICreateLeaveTimeRequest, 'userId'> = {
			startTime: this.addLeaveForm.get('startDate')?.value.plus({ minutes: timeZoneOffset }).toISO(),
			endTime: this.addLeaveForm.get('endDate')?.value.plus({ minutes: timeZoneOffset }).toISO(),
			leaveType: this.addLeaveForm.get('leaveType')?.value,
			comment: this.addLeaveForm.get('comment')?.value,
			minutes: this.recommendedTime$$.value * 60,
		};

		console.log('REQUEST:', leaveTimeRequest);

		return this._attendanceService.addLeaveTime(leaveTimeRequest);
	}

	public addHoursToAbsenceValidation(): void {
		this.tooltip = { disabled: true, message: '' };

		if (this.addLeaveForm.get('endDate')?.value && this.addLeaveForm.get('startDate')?.value) {
		}
		const endDateMonth = this.addLeaveForm.get('endDate')?.value.month;
		const endDateYear = this.addLeaveForm.get('endDate')?.value.year;
		const startDateMonth = this.addLeaveForm.get('startDate')?.value.month;
		const startDateYear = this.addLeaveForm.get('startDate')?.value.year;

		const leaveType: string = this.addLeaveForm.get('leaveType')?.value;
		const startDate: DateTime = this.addLeaveForm.get('startDate')?.value;
		const endDate: DateTime = this.addLeaveForm.get('endDate')?.value;

		const currentMonth = this.currentDate.month;
		const currentYear = this.currentDate.year;
		const currentDay = this.currentDate.day;

		if (endDate === null || startDate === null) {
			return;
		} else if (leaveType === LeaveType.SickLeave) {
			if (currentMonth === 12 && endDateMonth === 1) {
				this.tooltip = { disabled: true, message: '' };
			} else if (endDateYear > currentYear) {
				this.tooltip = {
					disabled: false,
					message: 'Проставлять больничный можно только на 1 месяц вперед от текущего месяца',
				};
			} else if (endDateMonth - currentMonth > 2) {
				this.tooltip = {
					disabled: false,
					message: 'Проставлять больничный можно только на 1 месяц вперед от текущего месяца',
				};
			}
		} else if (startDateYear < currentYear || (startDateMonth < currentMonth && startDateYear === currentYear)) {
			if (leaveType === LeaveType.SickLeave) {
				this.tooltip = { disabled: true, message: '' };
			} else if (currentDay > 5) {
				this.tooltip = {
					disabled: false,
					message: 'Проставлять даты за прошлый месяц можно только в первые 5 дней текущего месяца',
				};
			}
		} else {
			this.tooltip = { disabled: true, message: '' };
		}
	}
}
