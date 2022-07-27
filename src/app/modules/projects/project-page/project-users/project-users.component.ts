import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { first } from 'rxjs/operators';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { AddEmployeeDialogData, AddProjectUsersComponent } from '../../add-project-users/add-project-users.component';
import { SelectedProjectService } from '../../project-id-route-container/selected-project.service';
import { ProjectUsersService } from './project-users.service';

@Component({
	selector: 'do-project-users',
	templateUrl: './project-users.component.html',
	styleUrls: ['./project-users.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ProjectUsersService],
})
export class ProjectUsersComponent implements OnInit {
	public readonly Icons = Icons;

	public filterData = this.usersService.getFilterData();
	public tableColumns = this.usersService.getTableColumns();
	public dataSource = this.selectedProject.users$;

	constructor(
		private usersService: ProjectUsersService,
		private selectedProject: SelectedProjectService,
		private dialog: DialogService
	) {}

	ngOnInit(): void {}

	public addUsers(): void {
		this.selectedProject.info$.pipe(first()).subscribe({
			next: (p: ProjectResponse) => {
				const data: AddEmployeeDialogData = {
					entityId: p.project.id,
					entityName: p.project.name,
					idsToHide: p.usersIds || [],
				};
				this.dialog.open(AddProjectUsersComponent, { width: ModalWidth.M, data });
			},
		});
	}
}
