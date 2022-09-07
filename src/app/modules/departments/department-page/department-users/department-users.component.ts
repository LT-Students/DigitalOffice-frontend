import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ViewContainerRef } from '@angular/core';
import { first, switchMap } from 'rxjs/operators';
import { UserRights } from '@app/types/user-rights.enum';
import { Icons } from '@shared/modules/icons/icons';
import { DoTableDataSource } from '@app/types/do-table-data-source';
import { ActivatedRoute } from '@angular/router';
import { DepartmentPageStateService } from '../../department-id-route-container/department-page-state.service';
import { TableComponent } from '../../../table/table.component';
import { DynamicFilterComponent } from '../../../dynamic-filter/dynamic-filter.component';
import { AddUsersDialogService } from '../../../add-users-dialog/services/add-users-dialog.service';
import { AddUsersTableConfigService } from '../../../add-users-dialog/services/add-users-table-config.service';
import { AddUsersApiBase } from '../../../add-users-dialog/services/add-users-api.service';
import { DepartmentPermissionService } from '../../services/department-permission.service';
import { Department } from '../department';
import { TableConfigsService } from './services/table-configs.service';
import { AddDepartmentUsersApiService } from './services/add-department-users-api.service';
import { AddDepartmentUsersDialogTableConfigService } from './services/add-department-users-dialog-table-config.service';
import { DepartmentUsersApiService } from './services/department-users-api.service';
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

	public canManageUsers$ = this.departmentPermissions.canManageDepartment$(this.departmentState.department$);
	public filterData = this.tableConfigs.getFilterConfig();
	public tableOptions$ = this.tableConfigs.getTableOptions$();
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
		this.dataSource = this.createDataSource();
	}

	private createDataSource(): DoTableDataSource<DepartmentUser> {
		const initialData = this.route.snapshot.data['users'];
		const dataSource = new DoTableDataSource<DepartmentUser>(initialData);
		const id = this.route.snapshot.params['id'];
		dataSource.dataService = { loadData: this.apiService.findUsers.bind(this.apiService, id) };
		dataSource.sort = this.table.sort;
		dataSource.filter = this.filter;
		return dataSource;
	}

	public addUsers(): void {
		this.departmentState.department$
			.pipe(
				first(),
				switchMap((d: Department) => {
					const users = d.users.map((u) => ({ ...u, id: u.id }));
					return this.addUsersDialog
						.open({ entityId: d.id, entityName: d.name, existingUsers: users }, this.viewContainerRef)
						.afterClosed();
				})
			)
			.subscribe();
	}
}
