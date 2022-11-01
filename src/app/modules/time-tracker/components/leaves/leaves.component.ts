import { ChangeDetectionStrategy, Component, Input, ViewContainerRef } from '@angular/core';

import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DialogService, ModalWidth } from '@shared/component/dialog/dialog.service';
import { ConfirmDialogData } from '@shared/dialogs/confirm-dialog/confirm-dialog.component';
import { Icons } from '@shared/modules/icons/icons';
import { CanManageTimeInSelectedDate } from '@shared/modules/shared-time-tracking-system/models';
import { LeaveTime } from '../../models';
import { AttendanceService } from '../../services';
import { EditLeaveComponent } from '../../dialogs/edit-leave/edit-leave.component';

@Component({
	selector: 'do-leaves',
	templateUrl: './leaves.component.html',
	styleUrls: ['./leaves.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeavesComponent {
	public readonly Icons = Icons;

	@Input() leaves: LeaveTime[] = [];

	public canEdit$ = this.canManageTime.canEdit$;

	constructor(
		private dialogService: DialogService,
		private canManageTime: CanManageTimeInSelectedDate,
		private attendanceService: AttendanceService,
		private viewContainerRef: ViewContainerRef
	) {}

	public openEditDialog(leave: LeaveTime): void {
		this.dialogService.open(EditLeaveComponent, {
			width: ModalWidth.M,
			data: leave,
			viewContainerRef: this.viewContainerRef,
		});
	}

	public openDeleteDialog(leave: LeaveTime): void {
		const confirmDialogData: ConfirmDialogData = {
			title: 'Удаление записи',
			confirmText: 'Да, удалить',
			message: 'Вы действительно хотите удалить запись об отсутствии? Отменить это действие будет невозможно.',
		};

		this.dialogService
			.confirm(confirmDialogData)
			.closed.pipe(
				switchMap((confirmed?: boolean) =>
					!!confirmed ? this.attendanceService.deleteLeaveTime(leave.id) : EMPTY
				)
			)
			.subscribe();
	}
}
