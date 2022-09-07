import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { DoTableDataSource, ListParams } from '@app/types/do-table-data-source';
import { Icons } from '@shared/modules/icons/icons';
import { TableComponent } from '../../../table/table.component';
import { DynamicFilterComponent } from '../../../dynamic-filter/dynamic-filter.component';
import { DepartmentPermissionService } from '../../services/department-permission.service';
import { TableConfigsService } from './services/table-configs.service';
import { DepartmentProjectsApiService, FindDepartmentProjectsParams } from './services/department-projects-api.service';

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

	public canTransferProjects$ = this.departmentPermissions.canTransferProjects$('');

	constructor(
		private tableConfigs: TableConfigsService,
		private departmentPermissions: DepartmentPermissionService,
		private route: ActivatedRoute,
		private apiService: DepartmentProjectsApiService
	) {}

	public ngOnInit(): void {
		this.dataSource = this.createDataSource();
	}

	private createDataSource(): DoTableDataSource<ProjectInfo> {
		const initialData = this.route.snapshot.data['projects'];
		const dataSource = new DoTableDataSource<ProjectInfo>(initialData);
		const id = this.route.snapshot.params['id'];
		dataSource.dataService = {
			loadData: this.apiService.findProjects.bind(this.apiService, id),
			convertListParamsToRequestParams: this.convertListParamsToRequestParams.bind(this),
		};
		dataSource.sort = this.table.sort;
		dataSource.filter = this.filter;
		return dataSource;
	}

	private convertListParamsToRequestParams(params: ListParams): FindDepartmentProjectsParams {
		return {
			nameincludesubstring: params['search'],
			projectstatus: params['status'],
			isascendingsort: params.direction === 'asc',
		};
	}

	public transferProjects(): void {}
}
