import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { DoTableDataSource, ListParams } from '@app/types/do-table-data-source';
import { AppRoutes } from '@app/models/app-routes';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { Icons } from '@shared/modules/icons/icons';
import { TableComponent } from '../../../table/table.component';
import { DynamicFilterComponent } from '../../../dynamic-filter/dynamic-filter.component';
import { DepartmentPermissionService } from '../../services/department-permission.service';
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
	public readonly Icons = Icons;
	@ViewChild(TableComponent, { static: true }) table!: TableComponent<ProjectInfo>;
	@ViewChild(DynamicFilterComponent, { static: true }) filter!: DynamicFilterComponent;

	public filterConfig = this.tableConfigs.getFilterConfig();
	public tableOptions = this.tableConfigs.getTableOptions();
	public dataSource!: DoTableDataSource<ProjectInfo>;

	public canTransferProjects$ = this.departmentPermissions.canTransferProjects$(this.route.snapshot.params['id']);

	constructor(
		private tableConfigs: TableConfigsService,
		private departmentPermissions: DepartmentPermissionService,
		private router: Router,
		private route: ActivatedRoute,
		private apiService: DepartmentProjectsApiService,
		private dialog: DialogService,
		private viewContainerRef: ViewContainerRef
	) {}

	public ngOnInit(): void {
		this.dataSource = this.createDataSource();
	}

	private createDataSource(): DoTableDataSource<ProjectInfo> {
		const initialData = this.route.snapshot.data['projects'];
		const dataSource = new DoTableDataSource<ProjectInfo>(initialData);
		const id = this.route.snapshot.params['id'];
		dataSource.dataService = {
			loadData: this.apiService.findDepartmentProjects.bind(this.apiService, id),
			convertListParamsToRequestParams: this.convertListParamsToRequestParams.bind(this),
		};
		dataSource.sort = this.table.sort;
		dataSource.filter = this.filter;
		return dataSource;
	}

	private convertListParamsToRequestParams(params: ListParams): FindProjectsParams {
		return {
			nameincludesubstring: params['search'],
			projectstatus: params['status'],
			isascendingsort: params.direction === 'asc',
		};
	}

	public transferProjects(): void {
		this.dialog
			.open<boolean>(TransferProjectsDialogComponent, {
				width: ModalWidth.M,
				viewContainerRef: this.viewContainerRef,
				disableClose: true,
			})
			.afterClosed()
			.pipe(switchMap((shouldRefresh?: boolean) => (shouldRefresh ? this.dataSource.refetchData() : EMPTY)))
			.subscribe();
	}

	public navigateToProject(p: ProjectInfo): void {
		this.router.navigate([AppRoutes.Projects, p.id]);
	}
}
