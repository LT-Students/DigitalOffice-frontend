import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalService, ModalWidth } from '@app/services/modal.service';
import { OperationResultStatusType } from '@data/api/time-service/models/operation-result-status-type';
import { EditProjectComponent } from '../../modals/edit-project/edit-project.component';
import { IMappedProject } from '../user-tasks/user-tasks.component';
import { IDialogResponse } from '../user-tasks/user-tasks.component';

@Component({
	selector: 'do-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
	@Input() public projects: IMappedProject[] | undefined | null;

	//public canEdit: boolean;
	public selectedDate: Date;

	constructor(
		private _modalService: ModalService
	) {
		this.selectedDate = new Date();
		this.projects = [];
		//this.canEdit = false;
	}

	public getDate(year: number, month: number) {
		return new Date(year, month)
	}

	public openEditModal(project: IMappedProject) {
		let modalContentConfig = {
			id: project.id,
			name: project.name,
			userHours: project.userHours,
			managerHours: project.managerHours,
			description: project.description,
			month: project.month,
			year: project.year
		}
		let result: IDialogResponse = {}

		this._modalService.openModal(EditProjectComponent, ModalWidth.L, modalContentConfig, result).afterClosed().subscribe((res) => {
			console.log(res)
			if (res?.status === OperationResultStatusType.FullSuccess) {
				console.log('САС')
			}
		})
	}
}
