import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { DoTableDataSource, ListParams } from '@app/types/do-table-data-source';
import { AppRoutes } from '@app/models/app-routes';
import { DialogService, ModalWidth } from '@shared/component/dialog/dialog.service';
import { Icons } from '@shared/modules/icons/icons';
import { TableComponent } from '../../../table/table.component';
import { DynamicFilterComponent } from '../../../dynamic-filter/dynamic-filter.component';
import { DepartmentPermissionService } from '../../services/department-permission.service';
import { DepartmentPageStateService } from '../../department-id-route-container/department-page-state.service';
import { TableConfigsService } from './services/table-configs.service';
import { DepartmentProjectsApiService, FindProjectsParams } from './services/department-projects-api.service';
import { TransferProjectsDialogComponent } from './transfer-projects-dialog/transfer-projects-dialog.component';

@Component({
	selector: 'do-department-projects',
	templateUrl: './department-projects.component.html',
	styleUrls: ['./department-projects.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TableConfigsService],
})
export class DepartmentProjectsComponent implements OnInit {
	@ViewChild(TableComponent, { static: true }) table!: TableComponent<ProjectInfo>;
	@ViewChild(DynamicFilterComponent, { static: true }) filter!: DynamicFilterComponent;
	public readonly Icons = Icons;

	public filterConfig = this.tableConfigs.getFilterConfig();
	public tableOptions = this.tableConfigs.getTableOptions();
	public dataSource!: DoTableDataSource<ProjectInfo>;

	public canTransferProjects$ = this.departmentPermissions.canTransferProjects$(this.route.snapshot.params['id']);

	constructor(
		private depState: DepartmentPageStateService,
		private tableConfigs: TableConfigsService,
		private departmentPermissions: DepartmentPermissionService,
		private router: Router,
		private route: ActivatedRoute,
		private apiService: DepartmentProjectsApiService,
		private dialog: DialogService,
		private viewContainerRef: ViewContainerRef
	) {}

	public ngOnInit(): void {
		this.createDataSource();
	}

	public transferProjects(): void {
		this.dialog
			.open<boolean>(TransferProjectsDialogComponent, {
				width: ModalWidth.M,
				viewContainerRef: this.viewContainerRef,
				disableClose: true,
			})
			.closed.pipe(
				switchMap((shouldRefresh?: boolean) => (shouldRefresh ? this.dataSource.refetchData() : EMPTY))
			)
			.subscribe();
	}

	public navigateToProject(p: ProjectInfo): void {
		this.router.navigate([AppRoutes.Projects, p.id]);
	}

	private createDataSource(): void {
		this.depState.projects$.pipe(first()).subscribe((projects) => {
			this.dataSource = new DoTableDataSource<ProjectInfo>(projects);
			const id = this.route.snapshot.params['id'];
			this.dataSource.dataService = {
				loadData: this.apiService.findDepartmentProjects.bind(this.apiService, id),
				convertListParamsToRequestParams: this.convertListParamsToRequestParams.bind(this),
			};
			this.dataSource.sort = this.table.sort;
			this.dataSource.filter = this.filter;
		});
	}

	private convertListParamsToRequestParams(params: ListParams): FindProjectsParams {
		return {
			nameincludesubstring: params['search'],
			projectstatus: params['status'],
			isascendingsort: params.direction === 'asc',
		};
	}
}
