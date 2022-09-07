import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { AddUsersTableConfigService } from '../../../../add-users-dialog/services/add-users-table-config.service';
import { ColumnDef } from '../../../../table/models';
import { UserInfoParams } from '../../../../table/cell-components/user-info/user-info.component';
import { ExistingDepartmentUser, NewDepartmentUser } from '../models/new-department-user';
import { DepartmentRole, DepartmentRoleInfo } from '../models/department-role-info';

@Injectable()
export class AddDepartmentUsersDialogTableConfigService extends AddUsersTableConfigService<NewDepartmentUser> {
	private readonly iconColor = '#FFD89E';

	constructor() {
		super();
	}

	protected getAdditionalColumns(existingUsers: ExistingDepartmentUser[]): ColumnDef[] {
		return [
			new ColumnDef({
				type: 'selectCell',
				field: 'role',
				valueGetter: (user: NewDepartmentUser) => {
					const existingUser = existingUsers.find((u) => u.id === user.id);
					return existingUser?.role || user.role;
				},
				columnStyle: { flex: '0 0 auto' },
				params: {
					options: DepartmentRoleInfo.getAllRoles(),
					displayValueGetter: (role: DepartmentRole) => DepartmentRoleInfo.getRoleInfoByRole(role).label,
					iconGetter: (role: DepartmentRole) => DepartmentRoleInfo.getRoleInfoByRole(role).icon,
					iconColor: this.iconColor,
					updateRow: this.changeRole.bind(this),
					disabled: (u: NewDepartmentUser) => this.isUserExists(u.id, existingUsers),
				},
			}),
		];
	}

	protected getUserInfoParams(): UserInfoParams {
		return new UserInfoParams({
			statusIconGetter: (user: NewDepartmentUser) => DepartmentRoleInfo.getRoleInfoByRole(user.role).icon,
			iconColor: this.iconColor,
		});
	}

	private changeRole(u: NewDepartmentUser, role: DepartmentRole): void {
		this.dataSource.data$.pipe(first()).subscribe({
			next: (users: NewDepartmentUser[]) => {
				if (role === DepartmentRole.Director) {
					const prevDirector = users.find((u) => u.role === DepartmentRole.Director);
					if (prevDirector) {
						this.dataSource.updateRow(prevDirector.id, { ...prevDirector, role: DepartmentRole.Employee });
					}
				}
				const newUser: NewDepartmentUser = { ...u, role };
				this.dataSource.updateRow(u.id, newUser);
			},
		});
	}
}
