import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TimeService } from '@app/services/time/time.service';
import { EditLeaveTimeRequest, EditWorkTimeRequest, LeaveType, OperationResultResponse } from '@data/api/time-service/models';
import { LeaveTimeModel } from '@app/models/leave-time.model';
import { concatMap, switchMap } from 'rxjs/operators';
import { AttendanceService } from '@app/services/attendance.service';
import { IDialogResponse } from '../../components/user-tasks/user-tasks.component';
import { IModalContentConfig } from '../../components/leaves/leaves.component';

@Component({
	selector: 'do-delete-leave',
	templateUrl: 'delete-leave.component.html',
	styleUrls: ['delete-leave.component.scss'],
})
export class DeleteLeaveComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public leave: IModalContentConfig,
		private _dialogRef: MatDialogRef<DeleteLeaveComponent, IDialogResponse>,
		private _timeService: TimeService,
		private _attendanceService: AttendanceService
	) {}

	public getRusType(leaveType: LeaveType) {
		return LeaveTimeModel.getLeaveInfoByLeaveType(leaveType)?.leaveInRussian;
	}

	public onClose(params?: IDialogResponse) {
		this._dialogRef.close(params);
	}

	public onSubmit() {
		const body: EditLeaveTimeRequest | EditWorkTimeRequest = [
			{
				op: 'replace',
				path: '/IsActive',
				value: false,
			},
		];

		this._timeService
			.editLeaveTime({
				leaveTimeId: this.leave.id as string,
				body,
			})
			.pipe(switchMap(() => this._attendanceService.getActivities()))
			.subscribe({
				next: () => this.onClose(),
			});
	}
}
