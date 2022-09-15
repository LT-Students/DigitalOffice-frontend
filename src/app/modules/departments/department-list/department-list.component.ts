import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { DepartmentInfo } from '@api/department-service/models/department-info';
import { UserRights } from '@app/types/user-rights.enum';
import { DoTableDataSource } from '@app/types/do-table-data-source';
import { PageEvent, PaginatorComponent } from '@shared/component/paginator/paginator.component';
import { FilterDef } from '../../dynamic-filter/models';
import { DynamicFilterComponent } from '../../dynamic-filter/dynamic-filter.component';
import { TableComponent } from '../../table/table.component';
import { DepartmentsRoutes } from '../models/departments-routes';
import { DepartmentService, FindDepartmentsParams } from '../services/department.service';
import { TableOptions } from '../../table/models';
import { DepartmentListService } from './department-list.service';
import { DepartmentListQueriesService } from './department-list-queries.service';

@Component({
	selector: 'do-department-list',
	templateUrl: './department-list.component.html',
	styleUrls: ['./department-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [DepartmentListService],
})
export class DepartmentListComponent implements OnInit {
	public readonly UserRights = UserRights;
	public readonly DepartmentsRoutes = DepartmentsRoutes;

	@ViewChild(DynamicFilterComponent, { static: true }) filter!: DynamicFilterComponent;
	@ViewChild(TableComponent, { static: true }) table!: TableComponent<DepartmentInfo>;
	@ViewChild(PaginatorComponent, { static: true }) paginator!: PaginatorComponent;

	public dataSource!: DoTableDataSource<DepartmentInfo>;

	public filters$!: Observable<FilterDef[]>;
	public tableOptions$!: Observable<TableOptions>;
	public initialPaginatorValue!: PageEvent;

	constructor(
		private departmentListService: DepartmentListService,
		private departmentService: DepartmentService,
		private tableQueries: DepartmentListQueriesService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	public ngOnInit(): void {
		this.initialPaginatorValue = this.departmentListService.getInitialPaginatorValue();
		this.filters$ = this.departmentListService.getFilterData$();
		this.tableOptions$ = this.departmentListService.getTableOptions$();
		this.dataSource = this.createDataSource();
	}

	public handleRowClick(department: DepartmentInfo): void {
		this.router.navigate([department.id], { relativeTo: this.route });
	}

	private createDataSource(): DoTableDataSource<DepartmentInfo> {
		const initialValue = this.route.snapshot.data['departments'];
		const dataSource = new DoTableDataSource<DepartmentInfo>(initialValue);
		dataSource.dataService = {
			loadData: (params: FindDepartmentsParams) => this.departmentService.findDepartments(params),
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
}
