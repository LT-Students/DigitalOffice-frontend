import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ModalService, ModalWidth } from '@app/services/modal.service';
import { EditProjectComponent } from '../../modals/edit-project/edit-project.component';
import { mappedProject } from '../user-tasks/user-tasks.component';

@Component({
	selector: 'do-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
	@Input() public projects: mappedProject[] | undefined | null;

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
		return new Date(year, month, 0)
	}

	public openEditModal(project: mappedProject) {
		this._modalService.openModal(EditProjectComponent, ModalWidth.L, {
			id: project.id,
			name: project.name,
			userHours: project.userHours,
			managerHours: project.managerHours,
			description: project.description,
			month: project.month,
			year: project.year
		})
	}
}
