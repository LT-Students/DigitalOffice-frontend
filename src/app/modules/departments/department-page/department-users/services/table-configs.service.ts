import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { AppRoutes } from '@app/models/app-routes';
import { Icons } from '@shared/modules/icons/icons';
import { AutocompleteConfigsService } from '@shared/component/autocomplete/autocomplete-configs.service';
import { DoTableDataSource } from '@app/types/do-table-data-source';
import { CurrentUserService } from '@app/services/current-user.service';
import { AutocompleteFilterParams, FilterDef, InputFilterParams } from '../../../../dynamic-filter/models';
import { ColumnDef, TableOptions } from '../../../../table/models';
import { UserInfoParams } from '../../../../table/cell-components/user-info/user-info.component';
import { DepartmentPageStateService } from '../../../department-id-route-container/department-page-state.service';
import { DepartmentPermissionService } from '../../../services/department-permission.service';
import { DepartmentRole, DepartmentRoleInfo } from '../models/department-role-info';
import { DepartmentUser } from '../models/department-user';
import { Department } from '../../department';
import { DepartmentUsersApiService } from './department-users-api.service';

@Injectable()
export class TableConfigsService {
	private readonly iconColor = '#FFD89E';

	set dataSource(dataSource: DoTableDataSource<DepartmentUser>) {
		this._dataSource = dataSource;
	}
	private _dataSource!: DoTableDataSource<DepartmentUser>;

	constructor(
		private departmentUsersApi: DepartmentUsersApiService,
		private departmentState: DepartmentPageStateService,
		private autocompleteConfigs: AutocompleteConfigsService,
		private router: Router,
		private departmentPermissions: DepartmentPermissionService,
		private currentUser: CurrentUserService
	) {}

	public getFilterConfig(): FilterDef[] {
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
				key: 'name',
				type: 'input',
				width: 324,
				params: new InputFilterParams({ placeholder: 'поиск', icon: Icons.Search }),
			},
		];
	}

	public getTableOptions$(): Observable<TableOptions> {
		return this.departmentPermissions
			.canManageUsers$(this.departmentState.department$.pipe(map((d: Department) => d.id)))
			.pipe(
				map((hasPermission: boolean) => {
					return {
						sortActive: 'role',
						sortDirection: 'desc',
						rowHeight: 64,
						columns: [
							new ColumnDef({
								type: 'userInfoCell',
								field: 'name',
								headerName: 'Фио',
								sortEnabled: true,
								disableClearSort: true,
								valueGetter: (user: DepartmentUser) => user,
								columnStyle: { overflow: 'hidden' },
								headerStyle: { 'margin-left': '60px' },
								params: new UserInfoParams({
									statusIconGetter: (user: DepartmentUser) =>
										DepartmentRoleInfo.getRoleInfoByRole(user.role).icon,
									iconColor: this.iconColor,
									onAvatarClick: (user: DepartmentUser) => {
										this.router.navigate([AppRoutes.Users, user.id]);
									},
									onNameClick: (user: DepartmentUser) => {
										this.router.navigate([AppRoutes.Users, user.id]);
									},
								}),
							}),
							new ColumnDef({
								type: 'selectCell',
								field: 'role',
								headerName: 'Роль',
								sortEnabled: true,
								disableClearSort: true,
								valueGetter: (user: DepartmentUser) => user.role,
								headerStyle: { 'padding-left': '20px', flex: '0 0 25%' },
								columnStyle: { flex: '0 0 25%' },
								params: {
									options: DepartmentRoleInfo.getAllRoles(),
									displayValueGetter: (role: DepartmentRole) =>
										DepartmentRoleInfo.getRoleInfoByRole(role).label,
									iconGetter: (role: DepartmentRole) =>
										DepartmentRoleInfo.getRoleInfoByRole(role).icon,
									iconColor: this.iconColor,
									updateRow: this.changeRole.bind(this),
									disabled: () => !hasPermission,
								},
							}),
						],
					};
				})
			);
	}

	private changeRole(u: DepartmentUser, role: DepartmentRole): void {
		this.departmentState.department$
			.pipe(
				first(),
				switchMap((d: Department) => this.departmentUsersApi.changeUserRole(d.id, u.id, role, u.role)),
				switchMap(() => forkJoin([this._dataSource.refetchData(), this.currentUser.refreshUser()]))
			)
			.subscribe();
	}
}
