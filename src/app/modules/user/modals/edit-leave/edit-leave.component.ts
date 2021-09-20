import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeService } from '@app/services/time/time.service';
import { LeaveTimeModel } from '@app/models/leave-time.model';
import { AttendanceService } from '@app/services/attendance.service';
import { LeaveType } from '@data/api/time-service/models';
import { DateFilterFn } from '@angular/material/datepicker';
import { switchMap } from 'rxjs/operators';
import { IDialogResponse } from '../../components/user-tasks/user-tasks.component';
import { IModalContentConfig } from '../../components/leaves/leaves.component';
import { TimeDurationService } from '@app/services/time-duration.service';

@Component({
	selector: 'do-edit-leave',
	templateUrl: './edit-leave.component.html',
	styleUrls: ['./edit-leave.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditLeaveComponent {
	public editForm: FormGroup;
	public periodInHours: number;
	public startTimeSelected: boolean;
	public disableWeekends: DateFilterFn<Date>;

	constructor(
		@Inject(MAT_DIALOG_DATA) public leave: IModalContentConfig,
		private _fb: FormBuilder,
		private _dialogRef: MatDialogRef<EditLeaveComponent, IDialogResponse>,
		private _timeService: TimeService,
		private _attendanceService: AttendanceService,
		private _timeDurationService: TimeDurationService
	) {
		this.disableWeekends = this._attendanceService.disableWeekends;
		this.startTimeSelected = false;
		this.editForm = this._initEditForm();
		this.periodInHours = 0;
		this._setPeriodInHours(new Date(leave.startTime as string), new Date(leave.endTime as string));
	}

	public filterDate = <D>(date: Date): boolean => {
		if (this.startTimeSelected) return date.getMonth() === new Date(this.editForm.get('startTime')?.value).getMonth();

		return true;
	};

	public DateSelected(): void {
		if (!this.editForm.get('endTime')?.value) {
			this.startTimeSelected = true;
		} else {
			const startTime = new Date(this.editForm.get('startTime')?.value);
			const endTime = new Date(this.editForm.get('endTime')?.value);

			this._setPeriodInHours(startTime, endTime);
			this.startTimeSelected = false;
		}
	}

	private _setPeriodInHours(startTime: Date, endTime: Date): void {
		this.periodInHours = this._timeDurationService.getDuration(
			{
				startDate: startTime,
				endDate: endTime,
			},
			8,
			true
		);
	}

	public getRusType(leaveType: LeaveType) {
		return LeaveTimeModel.getLeaveInfoByLeaveType(leaveType)?.leaveInRussian;
	}

	public onClose(params?: IDialogResponse): void {
		this._dialogRef.close(params);
	}

	public onSubmitClick(): void {
		let startTime = new Date(this.editForm.get('startTime')?.value).toISOString();
		let endTime = new Date(this.editForm.get('endTime')?.value).toISOString();

		if (!this.editForm.invalid) {
			this._timeService
				.editLeaveTime({
					leaveTimeId: this.leave.id as string,
					body: [
						{
							op: 'replace',
							path: '/Comment',
							value: this.editForm.get('description')?.value,
						},
						{
							op: 'replace',
							path: '/StartTime',
							value: startTime,
						},
						{
							op: 'replace',
							path: '/EndTime',
							value: endTime,
						},
					],
				})
				.pipe(switchMap(() => this._attendanceService.getActivities()))
				.subscribe(() => this.onClose());
		}
	}

	private _initEditForm(): FormGroup {
		const fg = this._fb.group({
			startTime: [new Date(this.leave.startTime as string), [Validators.required]],
			endTime: [new Date(this.leave.endTime as string), [Validators.required]],
			description: [this.leave.comment],
			id: this.leave.id,
		});

		return fg;
	}
}
