import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DateTime, Interval } from 'luxon';
import { LeaveTime } from '../../models/leave-time';
import { SubmitLeaveTimeValue } from '../../services/attendance.service';
import { AddLeaveTimeBaseComponent } from '../../shared/add-leave-time-base/add-leave-time-base.component';

@Component({
	selector: 'do-edit-leave',
	templateUrl: './edit-leave.component.html',
	styleUrls: ['./edit-leave.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditLeaveComponent implements OnInit {
	@ViewChild(AddLeaveTimeBaseComponent, { static: true }) baseComponent!: AddLeaveTimeBaseComponent;
	private initialValue!: Required<SubmitLeaveTimeValue>;

	constructor(@Inject(DIALOG_DATA) public leaveTime: LeaveTime, private dialogRef: DialogRef<EditLeaveComponent>) {}

	public ngOnInit(): void {
		this.excludeCurrentInterval();
		this.initialValue = {
			leaveType: this.leaveTime.leaveType,
			startTime: this.leaveTime.startTime,
			endTime: this.leaveTime.endTime,
			comment: this.leaveTime.comment || null,
			minutes: this.leaveTime.minutes,
			leaveTimeId: this.leaveTime.id,
		};
		this.baseComponent.form.patchValue(this.initialValue);
		this.setInitialIntervalDuration();
	}

	private excludeCurrentInterval(): void {
		const { startTime, endTime } = this.leaveTime;
		const currentInterval = Interval.fromDateTimes(startTime, endTime.plus({ day: 1 }));
		const disableReservedDaysFn = this.baseComponent.disableReservedDays;
		this.baseComponent.disableReservedDays = (date: DateTime | null) => {
			if (date && currentInterval.contains(date)) {
				return true;
			}
			return disableReservedDaysFn(date);
		};
	}

	private setInitialIntervalDuration(): void {
		this.baseComponent.handleDateSelection();
	}

	public close(): void {
		this.dialogRef.close();
	}

	public handleSubmit(): void {
		this.baseComponent.submit$(this.initialValue).subscribe({
			next: () => this.close(),
		});
	}
}
