import { Injectable } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { UserInfo } from '@api/project-service/models/user-info';
import { ProjectUserRoleType } from '@api/project-service/models/project-user-role-type';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { DialogService } from '@app/services/dialog.service';
import { Observable } from 'rxjs';
import { AutocompleteConfigsService } from '@shared/component/autocomplete/autocomplete-configs.service';
import { Router } from '@angular/router';
import { AppRoutes } from '@app/models/app-routes';
import { ProjectService } from '../../project.service';
import { AutocompleteFilterParams, FilterDef, InputFilterParams } from '../../../dynamic-filter/models';
import { ColumnDef } from '../../../table/models';
import { SelectedProjectService } from '../../project-id-route-container/selected-project.service';
import { UserInfoParams } from '../../../table/cell-components/user-info/user-info.component';

@Injectable()
export class ProjectUsersService {
	constructor(
		private selectedProject: SelectedProjectService,
		private projectService: ProjectService,
		private dialog: DialogService,
		private autocompleteConfigs: AutocompleteConfigsService,
		private router: Router
	) {}

	public getFilterData(): FilterDef[] {
		return [
			{
				key: 'position',
				type: 'autocomplete',
				width: 176,
				params: new AutocompleteFilterParams({
					...this.autocompleteConfigs.getPositionsConfig(),
					placeholder: 'Должность',
				}),
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
				headerStyle: { 'margin-left': '60px' },
				params: new UserInfoParams({
					statusIconGetter: (user: UserInfo) =>
						user.role === ProjectUserRoleType.Manager ? Icons.StarBorder : null,
					iconColor: '#FFD89E',
					onAvatarClick: (user: UserInfo) => {
						this.router.navigate([AppRoutes.Users, user.id]);
					},
					onNameClick: (user: UserInfo) => {
						this.router.navigate([AppRoutes.Users, user.id]);
					},
				}),
			},
			{
				type: 'selectCell',
				field: 'role',
				headerName: 'Роль',
				valueGetter: (user: UserInfo) => user.role,
				headerStyle: { 'padding-left': '20px', flex: '0 0 20%' },
				columnStyle: { flex: '0 0 20%' },
				params: {
					options: [ProjectUserRoleType.Employee, ProjectUserRoleType.Manager],
					displayValueGetter: (role: ProjectUserRoleType) =>
						role === ProjectUserRoleType.Manager ? 'Менеджер проекта' : 'Участник проекта',
					iconGetter: (role: ProjectUserRoleType) =>
						role === ProjectUserRoleType.Manager ? Icons.StarBorder : null,
					iconColor: '#FFD89E',
					updateRow: (user: UserInfo, role: ProjectUserRoleType) => {
						this.selectedProject.info$
							.pipe(
								first(),
								map((p: ProjectResponse) => p.project.id),
								switchMap((projectId: string) => this.changeUserRole(projectId, user.id, role))
							)
							.subscribe();
					},
				},
			},
			{
				type: 'iconButtonCell',
				field: 'delete-button',
				valueGetter: (user: UserInfo) => user,
				params: {
					icon: () => Icons.Delete,
					onClickFn: (user: UserInfo) => {
						this.selectedProject.info$
							.pipe(
								first(),
								map((p: ProjectResponse) => p.project.id)
							)
							.subscribe({
								next: (projectId: string) => {
									this.dialog.confirm({
										title: 'Удаление сотрудника из проекта',
										message: 'Вы действительно хотите удалить этого сотрудника из проекта?',
										confirmText: 'Да, удалить',
										action$: this.removeUsers(projectId, [user.id]),
									});
								},
							});
					},
				},
				headerStyle: { flex: '0 0 48px' },
				columnStyle: { flex: '0' },
			},
		];
	}

	private removeUsers(projectId: string, userIds: string[]): Observable<any> {
		return this.projectService.removeUsers(projectId, userIds).pipe(
			switchMap(() => this.projectService.getProjectUsers(projectId)),
			tap((users: UserInfo[]) => this.selectedProject.setProject({ users }))
		);
	}

	private changeUserRole(projectId: string, userId: string, role: ProjectUserRoleType): Observable<any> {
		return this.projectService.changeUserRole(projectId, userId, role).pipe(
			switchMap(() => this.projectService.getProjectUsers(projectId)),
			tap((users: UserInfo[]) => this.selectedProject.setProject({ users }))
		);
	}
}
