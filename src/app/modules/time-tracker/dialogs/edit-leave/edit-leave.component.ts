import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateTime, Interval } from 'luxon';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { RANGE_DATE_FORMAT } from '@app/configs/date-formats';
import { LeaveTime } from '../../models/leave-time';
import { AttendanceService, SubmitLeaveTimeValue } from '../../services/attendance.service';
import { AddEditLeaveHoursBase } from '../../components/add-hours/add-leave-hours/add-edit-leave-hours-base';

@Component({
	selector: 'do-edit-leave',
	templateUrl: './edit-leave.component.html',
	styleUrls: ['./edit-leave.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MAT_DATE_FORMATS, useValue: RANGE_DATE_FORMAT }],
})
export class EditLeaveComponent extends AddEditLeaveHoursBase implements OnInit {
	private initialValue!: Required<SubmitLeaveTimeValue>;

	constructor(
		@Inject(MAT_DIALOG_DATA) public leaveTime: LeaveTime,
		private dialogRef: MatDialogRef<EditLeaveComponent>,
		fb: FormBuilder,
		attendanceService: AttendanceService
	) {
		super(fb, attendanceService);
	}

	public ngOnInit(): void {
		this.excludeCurrentInterval();
		this.setInitialIntervalDuration();
		this.initialValue = {
			leaveType: this.leaveTime.leaveType,
			startTime: this.leaveTime.startTime,
			endTime: this.leaveTime.endTime,
			comment: this.leaveTime.comment || null,
			minutes: this.leaveTime.minutes,
			leaveTimeId: this.leaveTime.id,
		};
		this.form.patchValue(this.initialValue);
	}

	private excludeCurrentInterval(): void {
		const { startTime, endTime } = this.leaveTime;
		const currentInterval = Interval.fromDateTimes(startTime, endTime.plus({ day: 1 }));
		const disableReservedDaysFn = this.disableReservedDays;
		this.disableReservedDays = (date: DateTime | null) => {
			if (date && currentInterval.contains(date)) {
				return true;
			}
			return disableReservedDaysFn(date);
		};
	}

	private setInitialIntervalDuration(): void {
		this.selectedIntervalDurationInHours$.next(this.leaveTime.minutes / 60);
	}

	public close(): void {
		this.dialogRef.close();
	}

	public handleSubmit(): void {
		this.submit$(this.initialValue).subscribe({
			next: (isSubmitted: boolean) => (isSubmitted ? this.close() : null),
		});
	}
}
