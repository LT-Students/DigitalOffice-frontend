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

@Component({
	selector: 'do-add-leave-hours',
	templateUrl: './add-leave-hours.component.html',
	styleUrls: ['./add-leave-hours.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddLeaveHoursComponent {
	public addLeaveForm: FormGroup;

	public loading$$: BehaviorSubject<boolean>;

	public minDate: DateTime;
	public maxDate: DateTime;
	public recommendedTime$$: BehaviorSubject<number>;
	public disableWeekends: DateFilterFn<DateTime>;

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

		[this.minDate, this.maxDate] = this._attendanceService.getCalendarMinMax();
		this.addLeaveForm = this._fb.group({
			leaveType: [null, [Validators.required]],
			startDate: [null, [Validators.required]],
			endDate: [null, [Validators.required]],
			comment: [null],
		});
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
		console.log(this._attendanceService.getLeaveDuration(datePeriod));
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
}
