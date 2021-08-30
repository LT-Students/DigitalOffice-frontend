import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { ModalService, ModalWidth } from '@app/services/modal.service';
import { LeaveTimeInfo, LeaveType, OperationResultStatusType } from '@data/api/time-service/models';
import { LeaveTimeModel } from '@app/models/leave-time.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AttendanceService } from '@app/services/attendance.service';
import { DatePeriod } from '@data/models/date-period';
import { DeleteLeaveComponent } from '../../modals/delete-leave/delete-leave.component';
import { EditLeaveComponent } from '../../modals/edit-leave/edit-leave.component';
import { IDialogResponse } from '../user-tasks/user-tasks.component';

export interface IModalContentConfig {
	id?: string;
	startTime?: string;
	endTime?: string;
	leaveType?: LeaveType;
	comment?: string;
	hours?: number;
	date?: Date;
}

@Component({
	selector: 'do-leaves',
	templateUrl: './leaves.component.html',
	styleUrls: ['./leaves.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeavesComponent {
	@Input() leaves: LeaveTimeInfo[] | undefined | null;
	@ViewChild('comment') comment: ElementRef | undefined;

	public canEdit$: Observable<boolean>;

	constructor(
		private _modalService: ModalService,
		private _cdr: ChangeDetectorRef,
		private _snackBar: MatSnackBar,
		private _attendanceService: AttendanceService
	) {
		this.leaves = [];
		this.canEdit$ = this._attendanceService.canEdit$;
	}

	public getRusType(leaveType: LeaveType) {
		return LeaveTimeModel.getLeaveInfoByLeaveType(leaveType)?.leaveInRussian;
	}

	public getPeriodInHours(startTime: string, endTime: string): number {
		const datePeriod: DatePeriod = { startDate: new Date(startTime), endDate: new Date(endTime) };

		return this._attendanceService.getRecommendedTime(datePeriod, 8, true);
	}

	public openEditModal(leave: LeaveTimeInfo): void {
		let modalContentConfig: IModalContentConfig = {
			id: leave.id,
			startTime: leave.startTime,
			endTime: leave.endTime,
			leaveType: leave.leaveType,
			comment: leave.comment,
			hours: this.getPeriodInHours(leave.startTime as string, leave.endTime as string),
		};

		this._modalService
			.openModal<EditLeaveComponent, IModalContentConfig, IDialogResponse>(EditLeaveComponent, ModalWidth.L, modalContentConfig)
			.afterClosed()
			.subscribe((result) => {
				if (result?.status === OperationResultStatusType.FullSuccess) {
					leave.comment = result.data.comment;
					leave.startTime = result.data.startTime;
					leave.endTime = result.data.endTime;

					this._cdr.detectChanges();
					this._snackBar.open('Leave successfully edited', 'Close', { duration: 3000 });
				}
			});
	}

	public openDeleteModal(leave: LeaveTimeInfo): void {
		let modalContentConfig: IModalContentConfig = {
			leaveType: leave.leaveType,
			date: new Date(leave.startTime as string),
			id: leave.id,
		};

		this._modalService
			.openModal<DeleteLeaveComponent, IModalContentConfig, IDialogResponse>(DeleteLeaveComponent, ModalWidth.M, modalContentConfig)
			.afterClosed()
			.subscribe();
	}
}
