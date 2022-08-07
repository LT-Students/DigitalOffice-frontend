import { Injectable } from '@angular/core';
import { UserInfo } from '@api/filter-service/models/user-info';
import { ProjectUserRoleType, UserRequest } from '@api/project-service/models';
import { Icons } from '@shared/modules/icons/icons';
import { FilterService } from '@app/services/filter/filter.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CheckboxParams } from '../../table/cell-components/checkbox/checkbox.component';
import { TableOptions } from '../../table/models/table-options';
import { ProjectService } from '../project.service';
import { AddUsersDataSource } from './add-project-users.component';

export interface ProjectUserInfo extends UserInfo {
	projectRole: ProjectUserRoleType;
}

@Injectable()
export class AddProjectUsersService {
	constructor(private filterService: FilterService, private projectService: ProjectService) {}

	public getTableData(idsToHide: string[], dataSource: AddUsersDataSource): TableOptions {
		return {
			selectionCompareWith: (u1: ProjectUserInfo, u2: ProjectUserInfo) => u1.id === u2.id,
			rowHeight: 64,
			columns: [
				{
					type: 'checkboxCell',
					field: 'checkbox',
					valueGetter: (u: ProjectUserInfo) => this.alreadyInProject(u.id, idsToHide),
					columnStyle: { flex: '0 0 auto' },
					params: new CheckboxParams({
						disabled: (u: ProjectUserInfo) => this.alreadyInProject(u.id, idsToHide),
						disabledTooltip: () => 'Сотрудник уже проекте',
					}),
				},
				{
					type: 'userInfoCell',
					field: 'userInfo',
					valueGetter: (user: ProjectUserInfo) => user,
					columnStyle: { flex: '1 1 10%', overflow: 'hidden' },
					params: {
						statusIconGetter: (user: ProjectUserInfo) =>
							user.projectRole === ProjectUserRoleType.Manager ? Icons.StarBorder : null,
						iconColor: '#FFD89E',
					},
				},
				{
					type: 'textCell',
					field: 'department',
					valueGetter: (user: ProjectUserInfo) => user.department?.name,
					params: { lineClamp: 2 },
				},
				{
					type: 'selectCell',
					field: 'role',
					valueGetter: (user: ProjectUserInfo) => user.projectRole,
					params: {
						options: [ProjectUserRoleType.Employee, ProjectUserRoleType.Manager],
						displayValueGetter: (role: ProjectUserRoleType) =>
							role === ProjectUserRoleType.Manager ? 'Менеджер проект' : 'Участник проекта',
						iconGetter: (role: ProjectUserRoleType) =>
							role === ProjectUserRoleType.Manager ? Icons.StarBorder : null,
						iconColor: '#FFD89E',
						updateRow: (u: ProjectUserInfo, role: ProjectUserRoleType) => {
							const newUser = { ...u, projectRole: role };
							dataSource.updateRow(u.id, newUser);
						},
						disabled: (u: ProjectUserInfo) => this.alreadyInProject(u.id, idsToHide),
					},
				},
			],
		};
	}

	public findUsers(name: string): Observable<ProjectUserInfo[]> {
		return this.filterService
			.filterUsers({ skipCount: 0, takeCount: 50, fullnameincludesubstring: name })
			.pipe(
				map((res) =>
					(res.body as UserInfo[]).map((u: UserInfo) => ({ ...u, projectRole: ProjectUserRoleType.Employee }))
				)
			);
	}

	public addUsers(projectId: string, users: ProjectUserInfo[]): Observable<any> {
		const newUsers: UserRequest[] = users.map((u: ProjectUserInfo) => ({ userId: u.id, role: u.projectRole }));
		return this.projectService
			.addUsers(projectId, newUsers)
			.pipe(switchMap(() => this.projectService.getProjectUsers(projectId)));
	}

	private alreadyInProject(userId: string, idsToHide: string[]): boolean {
		return idsToHide.includes(userId);
	}
}
