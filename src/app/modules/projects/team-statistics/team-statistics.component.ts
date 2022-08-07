import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { DateTime } from 'luxon';
import { TitleDatepickerV2Component } from '@shared/component/title-datepicker/title-datepicker-v2.component';
import { ActivatedRoute } from '@angular/router';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { MAX_INT32 } from '@app/utils/utils';
import { SortDirection } from '@angular/material/sort';
import { WorkTimeInfo } from '@api/time-service/models/work-time-info';
import { I18nPluralPipe } from '@angular/common';
import { SelectedProjectService } from '../project-id-route-container/selected-project.service';
import { TableComponent } from '../../table/table.component';
import { DynamicFilterComponent } from '../../dynamic-filter/dynamic-filter.component';
import { TeamStatisticsService } from './team-statistics.service';
import { TimeService } from './time.service';
import { UserStat } from './user-stat';

@Component({
	selector: 'do-team-statistics',
	templateUrl: './team-statistics.component.html',
	styleUrls: ['./team-statistics.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TeamStatisticsService, I18nPluralPipe],
})
export class TeamStatisticsComponent implements OnInit, AfterViewInit {
	public readonly Icons = Icons;
	public readonly maxDate = DateTime.now().plus({ month: 1 });

	@ViewChild(TitleDatepickerV2Component) datepicker!: TitleDatepickerV2Component;
	@ViewChild(TableComponent) table!: TableComponent<UserStat>;
	@ViewChild(DynamicFilterComponent) filter!: DynamicFilterComponent;

	public projectId = this.route.snapshot.params.id;
	public projectName$ = this.selectedProject.info$.pipe(
		map((projectResponse: ProjectResponse) => projectResponse.project.name)
	);
	public tableData = this.teamStatistics.getTableData();
	public filterConfig = this.teamStatistics.getFilters();
	public expandedRow!: ReturnType<TeamStatisticsService['getExpandedRowData']>;
	public dataSource!: TimeListDataSource;

	constructor(
		private teamStatistics: TeamStatisticsService,
		private selectedProject: SelectedProjectService,
		private route: ActivatedRoute,
		private timeService: TimeService
	) {}

	public ngOnInit(): void {
		const data = this.route.snapshot.data.stats;
		this.dataSource = new TimeListDataSource(data, this.timeService);
		this.expandedRow = this.teamStatistics.getExpandedRowData(this.dataSource);
	}

	public ngAfterViewInit(): void {
		const sort = this.table.sort;
		merge(sort.sortChange, this.filter.filterChange, this.datepicker.dateSelection)
			.pipe(
				switchMap(() => {
					const { year, month } = this.datepicker.selectDate;
					const name = this.filter.value['name'] || '';
					return this.dataSource.loadStats(this.projectId, month, year, sort.direction, name);
				})
			)
			.subscribe();
	}

	public handleDownload(): void {
		this.selectedProject.info$.pipe(first()).subscribe({
			next: (project: ProjectResponse) => {
				const projectId = project.project.id;
				const { year, month } = this.datepicker.selectDate;
				this.teamStatistics.downloadStatistics(projectId, month, year);
			},
		});
	}
}

export class TimeListDataSource extends DataSource<UserStat> {
	private data = new BehaviorSubject<UserStat[]>([]);

	constructor(data: UserStat[], private timeService: TimeService) {
		super();
		this.data.next(data);
	}

	connect(collectionViewer: CollectionViewer): Observable<UserStat[]> {
		return this.data.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {}

	public loadStats(
		projectId: string,
		month: number,
		year: number,
		sort: SortDirection,
		name: string
	): Observable<UserStat[]> {
		const sortOrder = this.getSortOrder(sort);
		return this.timeService
			.findStats({
				projectId,
				month,
				year,
				skipCount: 0,
				takeCount: MAX_INT32,
				ascendingsort: sortOrder,
				nameincludesubstring: name || undefined,
			})
			.pipe(tap((data: UserStat[]) => this.data.next(data)));
	}

	public updateWorkTime(workTime: WorkTimeInfo, hours: number): void {
		const oldData = this.data.value;
		const newData = oldData.map((s: UserStat) => {
			let wt = s.workTimes.find((wt: WorkTimeInfo) => wt.id === workTime.id);
			if (wt) {
				return {
					...s,
					workTimes: s.workTimes.map((wt: WorkTimeInfo) =>
						wt.id === workTime.id ? { ...wt, userHours: hours, managerHours: hours } : wt
					),
				};
			}
			return s;
		});
		this.data.next(newData);
		this.timeService.editWorkTime(workTime.id, hours).subscribe({ error: () => this.data.next(oldData) });
	}

	private getSortOrder(sort: SortDirection): boolean | undefined {
		return sort ? sort === 'asc' : undefined;
	}
}
