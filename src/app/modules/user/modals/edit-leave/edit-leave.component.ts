import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TimeService } from '@app/services/time/time.service';
import { AttendanceService } from '@app/services/attendance.service';
import { DateFilterFn } from '@angular/material/datepicker';
import { LeaveTimeModel } from '@app/models/time/leave-time.model';
import { DatePeriod } from '@app/types/date-period';
import { DateService } from '@app/services/date.service';
import { LeaveTimePath, PatchRequest } from '@app/types/patch-paths';
import { PatchLeaveTimeDocument } from '@data/api/time-service/models/patch-leave-time-document';
import { DateTime } from 'luxon';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { RANGE_DATE_FORMAT } from '@app/configs/date-formats';
import { IDialogResponse } from '../../components/user-tasks/user-tasks.component';

@Component({
	selector: 'do-edit-leave',
	templateUrl: './edit-leave.component.html',
	styleUrls: ['./edit-leave.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MAT_DATE_FORMATS, useValue: RANGE_DATE_FORMAT }],
})
export class EditLeaveComponent {
	public editForm: FormGroup;
	public periodInHours: number;
	public disableWeekends: DateFilterFn<DateTime>;
	private readonly _initialData: PatchRequest<LeaveTimePath>;

	constructor(
		@Inject(MAT_DIALOG_DATA) public leave: LeaveTimeModel,
		private _fb: FormBuilder,
		private _dialogRef: MatDialogRef<EditLeaveComponent, IDialogResponse>,
		private _timeService: TimeService,
		private _dateService: DateService,
		private _attendanceService: AttendanceService
	) {
		this._initialData = {
			'/Comment': [this.leave.comment],
			'/StartTime': [new Date(this.leave.startTime), [Validators.required]],
			'/EndTime': [new Date(this.leave.endTime), [Validators.required]],
			'/Minutes': [this.leave.minutes],
		};
		this.editForm = this._fb.group(this._initialData);

		this.periodInHours = leave.hours;
		this.disableWeekends = this._attendanceService.disableWeekends;
	}

	public dateSelected(): void {
		const startDateValue = this.editForm.get('/StartTime')?.value;
		const endDateControl = this.editForm.get('/EndTime');
		if (!endDateControl?.value || startDateValue.startOf('day').equals(endDateControl.value.startOf('day'))) {
			endDateControl?.setValue(new Date(startDateValue.getTime() + 1));
		}

		const datePeriod: DatePeriod = {
			startDate: startDateValue,
			endDate: endDateControl?.value,
		};
		this.periodInHours = this._attendanceService.getLeaveDuration(datePeriod);
		this.editForm.get('/Minutes')?.setValue(this.periodInHours * 60);
	}

	public onClose(params?: IDialogResponse): void {
		this._dialogRef.close(params);
	}

	public onSubmitClick(): void {
		const timeZoneOffset = (this.editForm.get('/StartTime')?.value as DateTime).offset;
		const editRequest = (Object.keys(this.editForm.controls) as LeaveTimePath[]).reduce(
			(acc: PatchLeaveTimeDocument[], key) => {
				const formValue = this.editForm.get(key)?.value;
				if (formValue !== this._initialData[key][0]) {
					const patchDocument: PatchLeaveTimeDocument = {
						op: 'replace',
						path: key,
						value:
							formValue instanceof DateTime
								? formValue.plus({ minutes: timeZoneOffset }).toISO()
								: formValue,
					};
					acc.push(patchDocument);
				}
				return acc;
			},
			[]
		);

		this._timeService
			.editLeaveTime({
				leaveTimeId: this.leave.id,
				body: editRequest,
			})
			.subscribe((res) =>
				this.onClose({
					status: res.status,
					data: {
						startTime: this.editForm.get('/StartTime')?.value,
						endTime: this.editForm.get('/EndTime')?.value,
						minutes: this.editForm.get('/Minutes')?.value,
						comment: this.editForm.get('/Comment')?.value,
					},
				})
			);
	}
}
