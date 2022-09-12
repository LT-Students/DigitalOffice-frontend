import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort, SortDirection } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { ProjectInfo } from '@api/project-service/models/project-info';
import { DoTableDataSource } from '@app/types/do-table-data-source';
import { UserRights } from '@app/types/user-rights.enum';
import { IFindProjects } from '@app/services/project/project.service';
import { PaginatorComponent } from '@shared/component/paginator/paginator.component';
import { ProjectsRoutes } from '../models/projects-routes';
import { ColumnDef } from '../../table/models';
import { FilterDef } from '../../dynamic-filter/models';
import { DynamicFilterComponent } from '../../dynamic-filter/dynamic-filter.component';
import { ProjectService } from '../project.service';
import { TableComponent } from '../../table/table.component';
import { ProjectTableService } from './project-table.service';
import { ClientQueryParam, ProjectTableQueriesService } from './project-table-queries.service';

@Component({
	selector: 'do-projects-table',
	templateUrl: './projects-table.component.html',
	styleUrls: ['./projects-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ProjectTableService],
})
export class ProjectsTableComponent implements OnInit, OnDestroy {
	public UserRights = UserRights;
	public ProjectsRoutes = ProjectsRoutes;

	@ViewChild(DynamicFilterComponent, { static: true }) filter!: DynamicFilterComponent;
	@ViewChild(TableComponent, { static: true }) table!: TableComponent<ProjectInfo>;
	@ViewChild(PaginatorComponent, { static: true }) paginator!: PaginatorComponent;

	public dataSource!: DoTableDataSource<ProjectInfo>;
	public initialQueryParams = this.route.snapshot.queryParams;
	public initialSort = this.getInitialSort(this.initialQueryParams[ClientQueryParam.Sort]);

	public filters: FilterDef[] = [];
	public columns: ColumnDef[] = [];

	private destroy$ = new Subject();

	constructor(
		private projectTableService: ProjectTableService,
		private projectService: ProjectService,
		private tableQueries: ProjectTableQueriesService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	public ngOnInit(): void {
		const departments$ = this.route.data.pipe(
			first(),
			map((data) => data.departments)
		);
		this.filters = this.projectTableService.getFilterData(this.initialQueryParams, departments$);
		this.columns = this.projectTableService.getTableColumns();
		this.dataSource = this.createDataSource();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private createDataSource(): DoTableDataSource<ProjectInfo> {
		const initialData = this.route.snapshot.data['projects'];
		const dataSource = new DoTableDataSource<ProjectInfo>(initialData);

		dataSource.dataService = {
			loadData: (params: IFindProjects) => this.projectService.findProjects(params),
			convertListParamsToRequestParams: this.tableQueries.convertListParamsToRequestParams.bind(
				this.tableQueries
			),
		};
		dataSource.queryParamsConverter = this.tableQueries;
		dataSource.route = this.route;
		dataSource.router = this.router;
		dataSource.filter = this.filter;
		dataSource.sort = this.table.sort;
		dataSource.paginator = this.paginator;

		return dataSource;
	}

	public handleRowClick(project: ProjectInfo): void {
		this.router.navigate([project.id], { relativeTo: this.route });
	}

	private getInitialSort(sortValue?: string): Sort {
		if (!sortValue) {
			return { active: 'name', direction: 'asc' };
		}
		const [active, direction] = sortValue.split('_');
		return {
			active,
			direction: direction as SortDirection,
		};
	}
}
