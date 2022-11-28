import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ViewContainerRef } from '@angular/core';
import { first, map, switchMap } from 'rxjs/operators';
import { UserRights } from '@app/types/user-rights.enum';
import { Icons } from '@shared/modules/icons/icons';
import { DoTableDataSource, ListParams } from '@app/types/do-table-data-source';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DepartmentPageStateService } from '../../department-id-route-container/department-page-state.service';
import { TableComponent } from '../../../table/table.component';
import { DynamicFilterComponent } from '../../../dynamic-filter/dynamic-filter.component';
import { AddUsersApiBase, AddUsersDialogService, AddUsersTableConfigService } from '../../../add-users-dialog/services';
import { DepartmentPermissionService } from '../../services/department-permission.service';
import { Department } from '../department';
import { TableOptions } from '../../../table/models';
import { TableConfigsService } from './services/table-configs.service';
import { AddDepartmentUsersApiService } from './services/add-department-users-api.service';
import { AddDepartmentUsersDialogTableConfigService } from './services/add-department-users-dialog-table-config.service';
import { DepartmentUsersApiService, FindUsersParams } from './services/department-users-api.service';
import { DepartmentUser } from './models/department-user';

@Component({
	selector: 'do-department-users',
	templateUrl: './department-users.component.html',
	styleUrls: ['./department-users.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		TableConfigsService,
		{ provide: AddUsersApiBase, useClass: AddDepartmentUsersApiService },
		{ provide: AddUsersTableConfigService, useClass: AddDepartmentUsersDialogTableConfigService },
	],
})
export class DepartmentUsersComponent implements OnInit {
	public readonly Icons = Icons;
	public readonly UserRights = UserRights;
	@ViewChild(TableComponent, { static: true }) table!: TableComponent<DepartmentUser>;
	@ViewChild(DynamicFilterComponent, { static: true }) filter!: DynamicFilterComponent;

	public canManageUsers$ = this.departmentPermissions.canManageUsers$(
		this.departmentState.department$.pipe(map((d: Department) => d.id))
	);
	public filterData = this.tableConfigs.getFilterConfig();
	public tableOptions$!: Observable<TableOptions>;
	public dataSource!: DoTableDataSource<DepartmentUser>;

	constructor(
		private tableConfigs: TableConfigsService,
		private apiService: DepartmentUsersApiService,
		private departmentState: DepartmentPageStateService,
		private departmentPermissions: DepartmentPermissionService,
		private addUsersDialog: AddUsersDialogService,
		private viewContainerRef: ViewContainerRef,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.departmentState.users$.pipe(first()).subscribe((users) => {
			this.dataSource = new DoTableDataSource<DepartmentUser>(users);
			const id = this.route.snapshot.params['id'];
			this.dataSource.dataService = {
				loadData: this.apiService.findUsers.bind(this.apiService, id),
				convertListParamsToRequestParams: this.convertListParamsToRequestParams.bind(this),
			};
			this.dataSource.sort = this.table.sort;
			this.dataSource.filter = this.filter;

			this.tableConfigs.dataSource = this.dataSource;
			this.tableOptions$ = this.tableConfigs.getTableOptions$();
		});
	}

	private convertListParamsToRequestParams(params: ListParams): FindUsersParams {
		const isRoleSort = params.active === 'role';
		const isAscendingSort = params.direction === 'asc';
		return {
			departmentUserRoleAscendingSort: isRoleSort ? isAscendingSort : undefined,
			isAscendingSort: !isRoleSort ? isAscendingSort : undefined,
			fullnameincludesubstring: params['name'],
			byPositionId: params['position'],
		};
	}

	public addUsers(): void {
		this.departmentState.department$
			.pipe(
				first(),
				switchMap((d: Department) => {
					const users = d.users.map((u) => ({ ...u, id: u.id }));
					return this.addUsersDialog.open(
						{ entityId: d.id, entityName: d.name, existingUsers: users },
						this.viewContainerRef
					).closed;
				}),
				switchMap(() => this.dataSource.refetchData())
			)
			.subscribe();
	}
}
