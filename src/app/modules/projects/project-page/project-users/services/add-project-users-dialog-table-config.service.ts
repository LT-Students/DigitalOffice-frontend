import { Injectable } from '@angular/core';
import { ProjectUserRoleType } from '@api/project-service/models';
import { Icons } from '@shared/modules/icons/icons';
import { AddUsersTableConfigService } from '../../../../add-users-dialog/services/add-users-table-config.service';
import { ColumnDef } from '../../../../table/models';
import { UserInfoParams } from '../../../../table/cell-components/user-info/user-info.component';
import { ExistingProjectUser, NewProjectUser } from '../models';
import { TextCellParams } from '../../../../table/cell-components/text/text.component';
import { SelectCellParams } from '../../../../table/cell-components/select/select.component';

@Injectable({
	providedIn: 'root',
})
export class AddProjectUsersDialogTableConfigService extends AddUsersTableConfigService<NewProjectUser> {
	private readonly iconColor = '#FFD89E';

	protected getAdditionalColumns(existingUsers: ExistingProjectUser[]): ColumnDef[] {
		return [
			new ColumnDef({
				type: 'textCell',
				field: 'department',
				valueGetter: (u: NewProjectUser) => u.department,
				params: new TextCellParams({ lineClamp: 2 }),
			}),
			new ColumnDef({
				type: 'selectCell',
				field: 'role',
				valueGetter: (user: NewProjectUser) => {
					const existingUser = existingUsers.find((u: ExistingProjectUser) => u.id === user.id);
					return existingUser?.role || user.role;
				},
				columnStyle: { flex: '0 0 25%' },
				params: new SelectCellParams({
					options: [ProjectUserRoleType.Employee, ProjectUserRoleType.Manager],
					displayValueGetter: (role: ProjectUserRoleType) =>
						role === ProjectUserRoleType.Manager ? 'Менеджер проекта' : 'Участник проекта',
					iconGetter: (role: ProjectUserRoleType) =>
						role === ProjectUserRoleType.Manager ? Icons.StarBorder : null,
					iconColor: this.iconColor,
					updateRow: (u: NewProjectUser, role: ProjectUserRoleType) => {
						const newUser = { ...u, role };
						this.dataSource.updateRow(u.id, newUser);
					},
					disabled: (u: NewProjectUser) => this.isUserExists(u.id, existingUsers),
				}),
			}),
		];
	}

	protected getUserInfoParams(existingUsers: ExistingProjectUser[]): UserInfoParams {
		return new UserInfoParams({
			statusIconGetter: (user: NewProjectUser) =>
				user.role === ProjectUserRoleType.Manager ? Icons.StarBorder : null,
			iconColor: this.iconColor,
		});
	}
}
