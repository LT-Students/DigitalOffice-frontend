import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ModalService, ModalWidth } from '@app/services/modal.service';
import { DeleteTaskComponent } from '../../modals/delete-task/delete-task.component';
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

	public openDeleteModal(project: mappedProject) {
		this._modalService.openModal(DeleteTaskComponent, ModalWidth.M, {
			taskType: 'project',
			name: project.name,
			date: new Date(project.year, project.month - 1)
		})
	}
}
