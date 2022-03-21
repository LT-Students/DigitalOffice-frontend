import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateTime, Interval } from 'luxon';
import { BehaviorSubject, Observable } from 'rxjs';
import { OperationResultResponse } from '@api/time-service/models/operation-result-response';
import { ICreateLeaveTimeRequest } from '@app/services/time/time.service';
import { DatePeriod } from '@app/types/date-period';
import { DateFilterFn } from '@angular/material/datepicker';
import { ILeaveType, LeaveTypeModel } from '@app/models/time/leave-type.model';
import { finalize, switchMap } from 'rxjs/operators';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { RANGE_DATE_FORMAT } from '@app/configs/date-formats';
import { LeaveType } from '@api/time-service/models';
import { AttendanceService } from '../../../services/attendance.service';

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
		if (!startDateValue) return;
		if (!endDateControl?.value) {
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
				switchMap(() => this._attendanceService.getLeaveTimeIntervals()),
				finalize(() => {
					this.loading$$.next(false);
				})
			)
			.subscribe(() => {
				this.addLeaveForm.reset();
			});
	}

	private _addLeaveTime(): Observable<OperationResultResponse> {
		// TODO: при добавлении отсутствия часы startTime должны быть в начале дня, а endTime в конце дня, но с учётом таймзоны.
		// Таким образом 2021.12.13T03:00:00Z+3 - 2021.12.17T21:00:00Z+3 (или что-то подобное)
		const timeZoneOffset = (this.addLeaveForm.get('startDate')?.value as DateTime).offset;

		// console.log('startDate', this.addLeaveForm.get('startDate')?.value);
		// console.log(
		// 	'startDate, after plus',
		// 	this.addLeaveForm.get('startDate')?.value.plus({ minutes: timeZoneOffset }).toISO()
		// );
		//
		// console.log('endDate', this.addLeaveForm.get('endDate')?.value);
		// console.log(
		// 	'endDate, after plus',
		// 	this.addLeaveForm.get('endDate')?.value.minus({ minutes: timeZoneOffset }).plus({ days: 1 }).toISO()
		// );

		const leaveTimeRequest: Omit<ICreateLeaveTimeRequest, 'userId'> = {
			startTime: this.addLeaveForm.get('startDate')?.value.plus({ minutes: timeZoneOffset }).toISO(),
			endTime: this.addLeaveForm
				.get('endDate')
				?.value.minus({ minutes: timeZoneOffset })
				.plus({ days: 1 })
				.toISO(),
			leaveType: this.addLeaveForm.get('leaveType')?.value,
			comment: this.addLeaveForm.get('comment')?.value,
			minutes: this.recommendedTime$$.value * 60,
		};

		return this._attendanceService.addLeaveTime(leaveTimeRequest);
	}

	public addHoursToAbsenceValidation(): void {
		this.tooltip = { disabled: true, message: '' };

		const leaveType: LeaveType = this.addLeaveForm.get('leaveType')?.value;
		const startDate: DateTime = this.addLeaveForm.get('startDate')?.value;
		const endDate: DateTime = this.addLeaveForm.get('endDate')?.value;
		const currentDay = this.currentDate.day;

		let fromStartToCurrentInterval = Interval.fromDateTimes(
			this.currentDate.startOf('month'),
			this.currentDate.startOf('month')
		);
		let fromCurrentToEndInterval = Interval.fromDateTimes(
			this.currentDate.startOf('month'),
			this.currentDate.startOf('month')
		);

		if (endDate === null || startDate === null) {
			return;
		} else {
			fromStartToCurrentInterval = Interval.fromDateTimes(
				startDate.startOf('month'),
				this.currentDate.startOf('month')
			);
			fromCurrentToEndInterval = Interval.fromDateTimes(
				this.currentDate.startOf('month'),
				endDate.startOf('month')
			);
		}

		if (leaveType === LeaveType.SickLeave) {
			if (fromCurrentToEndInterval.length('months') > 1) {
				this.tooltip = {
					disabled: false,
					message: 'Проставлять больничный можно только на 1 месяц вперед от текущего месяца',
				};
			}
		} else if (fromStartToCurrentInterval.length('months') === 1) {
			if (currentDay > 5) {
				this.tooltip = {
					disabled: false,
					message: 'Проставлять даты за прошлый месяц можно только в первые 5 дней текущего месяца',
				};
			}
		}
	}
}
