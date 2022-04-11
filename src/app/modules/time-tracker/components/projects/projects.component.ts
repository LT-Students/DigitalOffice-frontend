import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService, ModalWidth } from '@app/services/modal.service';
import { OperationResultStatusType } from '@api/time-service/models/operation-result-status-type';
import { WorkTimeInfo } from '@api/time-service/models/work-time-info';
import { EditProjectComponent } from '../../modals/edit-project/edit-project.component';
import { IDialogResponse } from '../user-tasks/user-tasks.component';

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
				ModalWidth.L,
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
}
