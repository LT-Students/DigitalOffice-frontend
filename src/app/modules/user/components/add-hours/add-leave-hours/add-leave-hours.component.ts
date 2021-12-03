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
import { DatePipe } from '@angular/common';

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

	public currentDate: Date;
	public minDate: DateTime;
	public maxDate: DateTime;
	public recommendedTime$$: BehaviorSubject<number>;
	public disableWeekends: DateFilterFn<DateTime>;
	private _datePipe: DatePipe;

	public absences: ILeaveType[];

	constructor(
		private _fb: FormBuilder,
		private _attendanceService: AttendanceService,
		private _responseService: ResponseMessageModel
	) {
		this.loading$$ = new BehaviorSubject<boolean>(false);
		this.recommendedTime$$ = new BehaviorSubject<number>(0);

		this.disableWeekends = this._attendanceService.disableWeekends;
		this.absences = LeaveTypeModel.getAllLeaveTypes();
		this.currentDate = new Date();
		this._datePipe = new DatePipe('en-US');

		this.addLeaveForm = this._fb.group({
			leaveType: [null, [Validators.required]],
			startDate: [null, [Validators.required]],
			endDate: [null, [Validators.required]],
			comment: [null],
		});

		[this.minDate, this.maxDate] = this._attendanceService.getCalendarMinMax();
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

	public addHoursToAbsenceValidation(): { disabled: boolean; tooltipMessage: string } {
		if (this.addLeaveForm.get('leaveType')?.value === 'SickLeave') {
			if (
				this.currentDate.getMonth() === 11 &&
				Number(this._datePipe.transform(this.addLeaveForm.get('endDate')?.value, 'M')) === 1
			) {
				return {
					disabled: false,
					tooltipMessage: '',
				};
			}
			if (
				Number(this._datePipe.transform(this.addLeaveForm.get('endDate')?.value, 'Y')) >
				this.currentDate.getFullYear()
			) {
				return {
					disabled: true,
					tooltipMessage: 'Проставлять больничный можно только на 1 месяц вперед от текущего месяца',
				};
			}
			if (
				Number(this._datePipe.transform(this.addLeaveForm.get('endDate')?.value, 'M')) -
					this.currentDate.getMonth() >
				3
			) {
				return {
					disabled: true,
					tooltipMessage: 'Проставлять больничный можно только на 1 месяц вперед от текущего месяца',
				};
			}
		}
		if (
			Number(this._datePipe.transform(this.addLeaveForm.get('startDate')?.value, 'Y')) <
				this.currentDate.getFullYear() ||
			Number(this._datePipe.transform(this.addLeaveForm.get('startDate')?.value, 'M')) <
				this.currentDate.getMonth() + 1
		) {
			if (this.addLeaveForm.get('leaveType')?.value === 'SickLeave') {
				return { disabled: false, tooltipMessage: '' };
			}
			if (this.currentDate.getDate() > 5) {
				return {
					disabled: true,
					tooltipMessage: 'Проставлять даты за прошлый месяц можно только в первые 5 дней текущего месяца',
				};
			}
		}
		return { disabled: false, tooltipMessage: '' };
	}
}
