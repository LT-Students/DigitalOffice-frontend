import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { OperationResultStatusType } from '@api/time-service/models';
import { EMPTY, iif, Observable } from 'rxjs';
import { LeaveTimeModel } from '@app/models/time/leave-time.model';
import { TimeService } from '@app/services/time/time.service';
import { switchMap, tap } from 'rxjs/operators';
import { ConfirmDialogData } from '@shared/dialogs/confirm-dialog/confirm-dialog.component';
import { AttendanceService } from '../../services/attendance.service';
import { EditLeaveComponent } from '../../modals/edit-leave/edit-leave.component';
import { IDialogResponse } from '../user-tasks/user-tasks.component';

@Component({
	selector: 'do-leaves',
	templateUrl: './leaves.component.html',
	styleUrls: ['./leaves.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeavesComponent {
	@Input() leaves?: Array<LeaveTimeModel>;
	@ViewChild('comment') comment: ElementRef | undefined;

	public canEdit$: Observable<boolean>;

	constructor(
		private _modalService: DialogService,
		private _cdr: ChangeDetectorRef,
		private _attendanceService: AttendanceService,
		private _timeService: TimeService
	) {
		this.leaves = [];

		this.canEdit$ = this._attendanceService.canEdit$;
	}

	public openEditModal(leave: LeaveTimeModel): void {
		this._modalService
			.openModal<EditLeaveComponent, LeaveTimeModel, IDialogResponse>(EditLeaveComponent, ModalWidth.M, leave)
			.afterClosed()
			.pipe(tap(() => this._attendanceService.getLeaveTimeIntervals().subscribe()))
			.subscribe((result) => {
				if (leave && result?.status === OperationResultStatusType.FullSuccess) {
					leave.comment = result.data.comment;
					leave.startTime = result.data.startTime;
					leave.endTime = result.data.endTime;
					leave.minutes = result.data.minutes;

					this._cdr.markForCheck();
				}
			});
	}

	public openDeleteModal(leave: LeaveTimeModel): void {
		const confirmDialogData: ConfirmDialogData = {
			title: 'Удаление записи',
			confirmText: 'Да, удалить',
			message: 'Вы действительно хотите удалить запись об отсутствии? Отменить это действие будет невозможно.',
		};

		this._modalService
			.confirm(confirmDialogData)
			.afterClosed()
			.pipe(
				switchMap((confirmed) => {
					return iif(() => !!confirmed, this._timeService.deleteLeaveTime(leave.id), EMPTY);
				}),
				switchMap(() => this._attendanceService.getLeaveTimeIntervals()),
				switchMap(() => this._attendanceService.getActivities())
			)
			.subscribe(() => {
				this.leaves = this.leaves?.filter((l) => l.id !== leave.id);
				this._cdr.markForCheck();
			});
	}
}
