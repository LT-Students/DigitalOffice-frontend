import { Injectable } from '@angular/core';
import { ColumnDef, TableOptions } from '../../table/models';
import { CheckboxParams } from '../../table/cell-components/checkbox/checkbox.component';
import { ExistingUserBase, NewUserBase } from '../models/models';
import { UserInfoParams } from '../../table/cell-components/user-info/user-info.component';
import { AddUsersDataSource } from '../models/add-users-data-source';

@Injectable({
	providedIn: 'root',
})
export abstract class AddUsersTableConfigService<T extends NewUserBase> {
	protected abstract getAdditionalColumns(existingUsers: ExistingUserBase[]): ColumnDef[];
	protected abstract getUserInfoParams(existingUsers: ExistingUserBase[]): UserInfoParams;

	public dataSource!: AddUsersDataSource<T>;

	public getTableConfig(existingUsers: ExistingUserBase[]): TableOptions {
		const additionalColumns = this.getAdditionalColumns ? this.getAdditionalColumns(existingUsers) : [];
		const userInfoParams = this.getUserInfoParams && this.getUserInfoParams(existingUsers);
		return {
			selectionCompareWith: (u1: T, u2: T) => u1.id === u2.id,
			rowHeight: 64,
			columns: [
				new ColumnDef({
					type: 'checkboxCell',
					field: 'checkbox',
					valueGetter: (u: T) => this.isUserExists(u.id, existingUsers),
					columnStyle: { flex: '0 0 auto' },
					params: new CheckboxParams({
						disabled: (u: T) => this.isUserExists(u.id, existingUsers),
						disabledTooltip: () => 'Сотрудник уже добавлен',
					}),
				}),
				new ColumnDef({
					type: 'userInfoCell',
					field: 'userInfo',
					valueGetter: (user: T) => user,
					columnStyle: { flex: '1 1 10%', overflow: 'hidden' },
					params: userInfoParams,
				}),
				...additionalColumns,
			],
		};
	}

	protected isUserExists(userId: string, existingUsers: ExistingUserBase[]): boolean {
		return !!existingUsers.find((u: ExistingUserBase) => u.id === userId);
	}
}
