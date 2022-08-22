import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectInfo } from '@api/project-service/models/project-info';
import { BehaviorSubject, Observable, PartialObserver, Subject } from 'rxjs';
import { UserRights } from '@app/types/user-rights.enum';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { PaginatorComponent } from '@shared/component/paginator/paginator.component';
import { first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { Sort, SortDirection } from '@angular/material/sort';
import { IFindProjects } from '@app/services/project/project.service';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from '@app/services/current-user.service';
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
export class ProjectsTableComponent implements OnInit, AfterViewInit, OnDestroy {
	public UserRights = UserRights;
	public ProjectsRoutes = ProjectsRoutes;

	@ViewChild(DynamicFilterComponent) filter!: DynamicFilterComponent;
	@ViewChild(TableComponent) table!: TableComponent<ProjectInfo>;
	@ViewChild(PaginatorComponent) paginator!: PaginatorComponent;

	public tableData!: ProjectsDataSource;
	public initialQueryParams = this.route.snapshot.queryParams;
	public initialSort = this.getInitialSort(this.initialQueryParams[ClientQueryParam.Sort]);

	private paramsChange$ = new Subject<boolean>();

	public filters: FilterDef[] = [];
	public columns: ColumnDef[] = [];

	private destroy$ = new Subject();

	constructor(
		private projectTableService: ProjectTableService,
		private projectService: ProjectService,
		private tableQueries: ProjectTableQueriesService,
		private route: ActivatedRoute,
		private router: Router,
		private currentUser: CurrentUserService
	) {}

	public ngOnInit(): void {
		this.tableData = new ProjectsDataSource(this.projectService, this.route);
		const departments$ = this.route.data.pipe(
			first(),
			map((data) => data.departments)
		);
		this.filters = this.projectTableService.getFilterData(this.initialQueryParams, departments$);
		this.columns = this.projectTableService.getTableColumns();
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

	public handleRowClick(project: ProjectInfo): void {
		this.router.navigate([project.id], { relativeTo: this.route });
	}

	public handleParamsChange(resetPaginator: boolean): void {
		this.paramsChange$.next(resetPaginator);
	}

	private getInitialSort(sortValue?: string): Sort {
		if (!sortValue) {
			return { active: 'name', direction: 'asc' };
		}
		const [active, direction] = sortValue.split('_');
		return {
			active,
			direction: (direction === 'rand' ? '' : direction) as SortDirection,
		};
	}

	public updateTableData(resetPaginator: boolean): void {
		const { active, direction } = this.table.sort;
		const { [ClientQueryParam.AllProjects]: projects, ...rest } = this.filter.value;
		const params = {
			...rest,
			[ClientQueryParam.Sort]: `${active}_${direction || 'rand'}`,
			[ClientQueryParam.AllProjects]: !projects && 'all',
			pageIndex: resetPaginator ? 0 : this.paginator.pageIndex,
			pageSize: this.paginator.pageSize,
		};
		const queryParams = this.tableQueries.filterQueries(params);
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams,
			queryParamsHandling: 'merge',
		});
		this.currentUser.user$
			.pipe(
				first(),
				switchMap((u: User) => {
					const requestParams = this.tableQueries.convertQueryURLParamsToEndpointParams(params, u.id);
					return this.tableData.loadProjects(requestParams);
				})
			)
			.subscribe({
				next: () => {
					if (resetPaginator) {
						this.paginator.pageIndex = 0;
					}
				},
			});
	}
}

class ProjectsDataSource implements DataSource<ProjectInfo> {
	public totalCount$ = new BehaviorSubject(0);
	private projects = new BehaviorSubject<ProjectInfo[]>([]);
	private projectsObserver: PartialObserver<OperationResultResponse<ProjectInfo[]>> = {
		next: (res) => {
			this.projects.next(res.body as ProjectInfo[]);
			this.totalCount$.next(res.totalCount as number);
		},
	};

	constructor(private projectService: ProjectService, private route: ActivatedRoute) {
		this.route.data
			.pipe(
				first(),
				map((response) => response.projects)
			)
			.subscribe(this.projectsObserver);
	}

	public connect(collectionViewer: CollectionViewer): Observable<ProjectInfo[]> {
		return this.projects.asObservable();
	}

	public disconnect(collectionViewer: CollectionViewer): void {}

	public loadProjects(params: IFindProjects): Observable<OperationResultResponse<ProjectInfo[]>> {
		return this.projectService.findProjects(params).pipe(tap(this.projectsObserver));
	}
}
