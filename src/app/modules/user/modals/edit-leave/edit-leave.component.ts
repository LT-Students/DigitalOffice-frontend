import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TimeService } from '@app/services/time/time.service';
import { AttendanceService } from '@app/services/attendance.service';
import { DateFilterFn } from '@angular/material/datepicker';
import { LeaveTimeModel } from '@app/models/time/leave-time.model';
import { DatePeriod } from '@app/types/date-period';
import { DateService } from '@app/services/date.service';
import { LeaveTimePath, InitialDataEditRequest } from '@app/types/edit-request';
import { DateTime, Interval } from 'luxon';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { RANGE_DATE_FORMAT } from '@app/configs/date-formats';
import { createEditRequest } from '@app/utils/utils';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IDialogResponse } from '../../components/user-tasks/user-tasks.component';

@Component({
	selector: 'do-edit-leave',
	templateUrl: './edit-leave.component.html',
	styleUrls: ['./edit-leave.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MAT_DATE_FORMATS, useValue: RANGE_DATE_FORMAT }],
})
export class EditLeaveComponent {
	public LeaveTimePath = LeaveTimePath;

	public editForm: FormGroup;
	public periodInHours: number;
	public disableWeekends: DateFilterFn<DateTime>;
	private readonly _initialData: InitialDataEditRequest<LeaveTimePath>;
	public loading$$: BehaviorSubject<boolean>;

	constructor(
		@Inject(MAT_DIALOG_DATA) public leave: LeaveTimeModel,
		private _fb: FormBuilder,
		private _dialogRef: MatDialogRef<EditLeaveComponent, IDialogResponse>,
		private _timeService: TimeService,
		private _dateService: DateService,
		private _attendanceService: AttendanceService
	) {
		this.loading$$ = new BehaviorSubject<boolean>(false);
		const timeZoneOffset = DateTime.fromISO(leave.startTime).offset;
		const currentInterval = Interval.fromDateTimes(
			DateTime.fromISO(this.leave.startTime),
			DateTime.fromISO(this.leave.endTime).plus({ minutes: timeZoneOffset })
		);

		this._initialData = {
			[LeaveTimePath.COMMENT]: [this.leave.comment],
			[LeaveTimePath.START_TIME]: [new Date(this.leave.startTime), [Validators.required]],
			[LeaveTimePath.END_TIME]: [new Date(this.leave.endTime), [Validators.required]],
			[LeaveTimePath.MINUTES]: [this.leave.minutes],
		};
		this.editForm = this._fb.group(this._initialData);

		this.periodInHours = leave.hours;
		this._attendanceService.removeInterval(currentInterval);
		this.disableWeekends = this._attendanceService.disableWeekends;
	}

	public dateSelected(): void {
		const startDateControl = this.editForm.get('/StartTime');
		const endDateControl = this.editForm.get('/EndTime');
		const startDateValue: DateTime = DateTime.fromISO(new Date(startDateControl?.value).toISOString());
		let endDateValue: DateTime = DateTime.fromISO(new Date(endDateControl?.value).toISOString());
		const timeZoneOffset = startDateValue?.offset;

		if (!startDateValue.isValid || !endDateValue.isValid || +endDateValue === 0) return;

		if (+startDateValue === +endDateValue) {
			endDateValue = startDateValue.endOf('day').minus({ minutes: timeZoneOffset });
		}
		startDateControl?.setValue(startDateValue);
		endDateControl?.setValue(endDateValue);
		const datePeriod: DatePeriod = {
			startDate: startDateValue,
			endDate: endDateValue,
		};
		this.periodInHours = this._attendanceService.getLeaveDuration(datePeriod);
		this.editForm.get('/Minutes')?.setValue(this.periodInHours * 60);
	}

	public onClose(params?: IDialogResponse): void {
		this._dialogRef.close(params);
	}

	public onSubmitClick(): void {
		this.loading$$.next(true);
		const editRequest = createEditRequest(this.editForm.getRawValue(), this._initialData);
		this._timeService
			.editLeaveTime({
				leaveTimeId: this.leave.id,
				body: editRequest,
			})
			.pipe(finalize(() => this.loading$$.next(false)))
			.subscribe(
				(res) => {
					this.onClose({
						status: res.status,
						data: {
							startTime: this.editForm.get('/StartTime')?.value,
							endTime: this.editForm.get('/EndTime')?.value,
							minutes: this.editForm.get('/Minutes')?.value,
							comment: this.editForm.get('/Comment')?.value,
						},
					});
				},
				(err) => console.log(err),
				() => this._attendanceService.getActivities().subscribe()
			);
	}
}
