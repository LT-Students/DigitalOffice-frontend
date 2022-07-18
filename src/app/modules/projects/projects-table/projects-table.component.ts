import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectInfo } from '@api/project-service/models/project-info';
import { Subject } from 'rxjs';
import { UserRights } from '@app/types/user-rights.enum';
import { InfiniteScrollDataProvider } from '@app/utils/infinite-scroll-data-provider';
import { ProjectsRoutes } from '../models/projects-routes';
import { ColumnDef } from '../../table/models';
import { FilterDef } from '../../dynamic-filter/models';
import { FilterEvent } from '../../dynamic-filter/dynamic-filter.component';
import { defaultProjectsTakeCount } from '../helpers';
import { SimpleDataSource } from '../../table/table.component';
import { ProjectTableService } from './project-table.service';

@Component({
	selector: 'do-projects-table',
	templateUrl: './projects-table.component.html',
	styleUrls: ['./projects-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ProjectTableService],
})
export class ProjectsTableComponent implements OnInit {
	public UserRights = UserRights;
	public ProjectsRoutes = ProjectsRoutes;

	public tableData!: SimpleDataSource<ProjectInfo>;
	public dataProvider!: InfiniteScrollDataProvider<ProjectInfo>;
	private filterValue = new Subject<FilterEvent>();
	public filters: FilterDef[] = this.projectTableService.getFilterData();
	public columns: ColumnDef[] = this.projectTableService.getTableColumns();

	constructor(
		private projectTableService: ProjectTableService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	public ngOnInit(): void {
		const loadDataFn = this.projectTableService.loadDataFn;
		this.dataProvider = new InfiniteScrollDataProvider<ProjectInfo>(
			loadDataFn,
			this.filterValue,
			defaultProjectsTakeCount
		);
		this.tableData = new SimpleDataSource(this.dataProvider.dataSource$);
	}

	public handleRowClick(project: ProjectInfo): void {
		this.router.navigate([project.id], { relativeTo: this.route });
	}

	public handleFilter(event: FilterEvent) {
		this.filterValue.next(event);
	}

	public handleScroll(): void {
		this.dataProvider.loadOnScroll();
	}
}
