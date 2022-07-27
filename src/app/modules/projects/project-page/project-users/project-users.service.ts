import { Injectable } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { UserInfo } from '@api/project-service/models/user-info';
import { ProjectUserRoleType } from '@api/project-service/models/project-user-role-type';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { DialogService } from '@app/services/dialog.service';
import { Observable } from 'rxjs';
import { ProjectService } from '../../project.service';
import { FilterDef, InputFilterParams } from '../../../dynamic-filter/models';
import { ColumnDef } from '../../../table/models';
import { SelectedProjectService } from '../../project-id-route-container/selected-project.service';

@Injectable()
export class ProjectUsersService {
	constructor(
		private selectedProject: SelectedProjectService,
		private projectService: ProjectService,
		private dialog: DialogService
	) {}

	public getFilterData(): FilterDef[] {
		return [
			{
				key: 'position',
				type: 'input',
				width: 176,
				params: new InputFilterParams({ placeholder: 'Должность', icon: Icons.ArrowDownV1 }),
			},
			{
				key: 'nameincludesubstring',
				type: 'input',
				width: 324,
				params: new InputFilterParams({ placeholder: 'поиск', icon: Icons.Search }),
			},
		];
	}

	public getTableColumns(): ColumnDef[] {
		return [
			{
				type: 'userInfoCell',
				field: 'userInfo',
				headerName: 'Фио',
				sortEnabled: true,
				valueGetter: (user: UserInfo) => ({ ...user, avatar: user.avatarImage }),
				columnStyle: { overflow: 'hidden' },
				params: {
					statusIconGetter: (user: UserInfo) =>
						user.role !== ProjectUserRoleType.Manager ? Icons.StarBorder : null,
					iconColor: '#FFD89E',
				},
			},
			{
				type: 'selectCell',
				field: 'role',
				headerName: 'Роль',
				valueGetter: (user: UserInfo) => user.role,
				columnStyle: { flex: '0 0 auto' },
				params: {
					options: [ProjectUserRoleType.Employee, ProjectUserRoleType.Manager],
					displayValueGetter: (role: ProjectUserRoleType) =>
						role === ProjectUserRoleType.Manager ? 'Менеджер проект' : 'Участник проекта',
					iconGetter: (role: ProjectUserRoleType) =>
						role === ProjectUserRoleType.Manager ? Icons.StarBorder : null,
					iconColor: '#FFD89E',
				},
			},
			{
				type: 'iconButtonCell',
				field: 'delete-button',
				valueGetter: (user: UserInfo) => user,
				params: {
					icon: () => Icons.Delete,
					onClickFn: (user: UserInfo) => {
						console.log('lol');
						this.selectedProject.info$
							.pipe(
								first(),
								map((p: ProjectResponse) => p.project.id)
							)
							.subscribe({
								next: (projectId: string) => {
									this.dialog.confirm({
										title: 'Удаление сотрудника из проекта',
										message: 'Вы действитеьлно хотите удалить этого сотрудника из проекта?',
										confirmText: 'Да, удалить',
										action$: this.removeUsers(projectId, [user.id]),
									});
								},
							});
					},
				},
				columnStyle: {
					'flex-grow': 0,
				},
			},
		];
	}

	private removeUsers(projectId: string, userIds: string[]): Observable<any> {
		return this.projectService.removeUsers(projectId, userIds).pipe(
			switchMap(() => this.projectService.getProjectUsers(projectId)),
			tap((users: UserInfo[]) => this.selectedProject.setProject({ users }))
		);
	}
}
