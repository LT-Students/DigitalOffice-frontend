import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService, ModalWidth } from '@app/services/modal.service';
import { OperationResultStatusType } from '@data/api/time-service/models/operation-result-status-type';
import { WorkTimeInfo } from '@data/api/time-service/models/work-time-info';
import { EditProjectComponent } from '../../modals/edit-project/edit-project.component';
import { IDialogResponse } from '../user-tasks/user-tasks.component';
import { ConfirmDialogData } from '../../../../shared/modals/confirm-dialog/confirm-dialog.component';

export interface IModalContentConfig {
	id?: string;
	name?: string;
	userHours?: number;
	managerHours?: number;
	description?: string;
	month?: number;
	year?: number;
}

@Component({
	selector: 'do-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
	@Input() public projects: Array<WorkTimeInfo | undefined> | undefined | null;
	@Input() public canEdit: boolean;
	// @Input() public canDelete: boolean;
	public selectedDate: Date;

	constructor(private _modalService: ModalService, private _snackBar: MatSnackBar, private _cdr: ChangeDetectorRef) {
		this.selectedDate = new Date();
		this.projects = [];
		this.canEdit = true;
	}

	public getDate(year: number, month: number) {
		return new Date(year, month + 1, 0);
	}

	public openEditModal(project: WorkTimeInfo | undefined) {
		let modalContentConfig: IModalContentConfig = {
			id: project?.id,
			name: project?.project?.name,
			userHours: project?.userHours ?? 0,
			managerHours: project?.managerHours ?? 0,
			description: project?.description,
			month: project?.month,
			year: project?.year,
		};

		this._modalService
			.openModal<EditProjectComponent, IModalContentConfig, IDialogResponse>(
				EditProjectComponent,
				ModalWidth.M,
				modalContentConfig
			)
			.afterClosed()
			.subscribe((res) => {
				if (project && res?.status === OperationResultStatusType.FullSuccess) {
					project.description = res.data.description;
					project.managerHours = res.data.managerHours;
					project.userHours = res.data.userHours;

					this._cdr.detectChanges();
					this._snackBar.open('Project successfully edited', 'Close', { duration: 3000 });
				}
			});
	}

	//Заглушка: причиной является отсутствие нужной ф-ии в модуле.
	public openDeleteModal(project: WorkTimeInfo | undefined) {
		const confirmDialogData: ConfirmDialogData = {
			title: 'Удаление записи',
			confirmText: 'Да, удалить',
			message: 'Вы действительно хотите удалить запись об отсутствии? Отменить это действие будет невозможно.',
		};

		this._modalService
			.confirm(confirmDialogData)
			.afterClosed()
			.pipe
			// switchMap((confirmed) => {
			// 	return iif(() => !!confirmed, this._timeService.deleteLeaveTime(leave.id), EMPTY);
			// }),
			// switchMap(() => this._attendanceService.getLeaveTimeIntervals())
			()
			.subscribe(() => {
				this._cdr.markForCheck();
			});
	}
}
