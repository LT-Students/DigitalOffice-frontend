import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { first, switchMap } from 'rxjs/operators';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { UserInfo } from '@api/project-service/models/user-info';
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
		this.selectedProject.info$
			.pipe(
				first(),
				switchMap((p: ProjectResponse) => {
					const data: AddEmployeeDialogData = {
						entityId: p.project.id,
						entityName: p.project.name,
						idsToHide: p.usersIds || [],
					};
					return this.dialog
						.open<UserInfo[]>(AddProjectUsersComponent, { width: ModalWidth.M, data })
						.afterClosed();
				})
			)
			.subscribe({
				next: (users?: UserInfo[]) => {
					if (users) {
						this.selectedProject.setProject({ users });
					}
				},
			});
	}
}
