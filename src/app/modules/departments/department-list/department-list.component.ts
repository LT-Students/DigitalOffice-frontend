import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { UserRights } from '@app/types/user-rights.enum';
import { PageEvent, PaginatorComponent } from '@shared/component/paginator/paginator.component';
import { takeUntil } from 'rxjs/operators';
import { DepartmentInfo } from '@api/department-service/models/department-info';
import { DoTableDataSource } from '@app/types/do-table-data-source';
import { FilterDef } from '../../dynamic-filter/models';
import { DynamicFilterComponent } from '../../dynamic-filter/dynamic-filter.component';
import { TableComponent } from '../../table/table.component';
import { DepartmentsRoutes } from '../models/departments-routes';
import { DepartmentService } from '../department.service';
import { TableOptions } from '../../table/models/table-options';
import { ListParams } from '../../feedback/feedback-list/feedback-list-queries.service';
import { DepartmentListService } from './department-list.service';
import { DepartmentListQueriesService } from './department-list-queries.service';

@Component({
	selector: 'do-department-list',
	templateUrl: './department-list.component.html',
	styleUrls: ['./department-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [DepartmentListService],
})
export class DepartmentListComponent implements OnInit, AfterViewInit, OnDestroy {
	public readonly UserRights = UserRights;
	public readonly DepartmentsRoutes = DepartmentsRoutes;

	@ViewChild(DynamicFilterComponent) filter!: DynamicFilterComponent;
	@ViewChild(TableComponent) table!: TableComponent<DepartmentInfo>;
	@ViewChild(PaginatorComponent) paginator!: PaginatorComponent;

	public dataSource!: DoTableDataSource<DepartmentInfo>;

	private paramsChange$ = new Subject<boolean>();

	public filters: FilterDef[] = [];
	public tableOptions: TableOptions = {};
	public initialPaginatorValue!: PageEvent;

	private destroy$ = new Subject();

	constructor(
		private departmentListService: DepartmentListService,
		private departmentService: DepartmentService,
		private tableQueries: DepartmentListQueriesService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	public ngOnInit(): void {
		this.dataSource = this.departmentListService.dataSource;
		this.initialPaginatorValue = this.departmentListService.getInitialPaginatorValue();
		this.filters = this.departmentListService.getFilterData();
		this.tableOptions = this.departmentListService.getTableOptions();
	}

	public ngAfterViewInit(): void {
		this.paramsChange$.pipe(takeUntil(this.destroy$)).subscribe({
			next: this.updateTableData.bind(this),
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public handleRowClick(department: DepartmentInfo): void {
		this.router.navigate([department.id], { relativeTo: this.route });
	}

	public handleParamsChange(resetPaginator: boolean): void {
		this.paramsChange$.next(resetPaginator);
	}

	public updateTableData(resetPaginator: boolean): void {
		const params = this.getListParams();
		const queryParams = this.tableQueries.convertListParamsToQueryUrlParams(params);
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams,
			queryParamsHandling: 'merge',
		});
		const requestParams = this.tableQueries.convertQueryURLParamsToEndpointParams(queryParams);
		this.dataSource.loadData(requestParams).subscribe({
			next: () => {
				if (resetPaginator) {
					this.paginator.pageIndex = 0;
				}
			},
		});
	}

	private getListParams(): ListParams {
		return {
			...this.filter.value,
			active: this.table.sort.active,
			direction: this.table.sort.direction,
			pageIndex: this.paginator.pageIndex,
			pageSize: this.paginator.pageSize,
		};
	}
}
