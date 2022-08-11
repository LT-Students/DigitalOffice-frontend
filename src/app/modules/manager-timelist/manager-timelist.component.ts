import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { switchMap, tap } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { TitleDatepickerV2Component } from '@shared/component/title-datepicker/title-datepicker-v2.component';
import { ActivatedRoute } from '@angular/router';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { MAX_INT32 } from '@app/utils/utils';
import { SortDirection } from '@angular/material/sort';
import { WorkTimeInfo } from '@api/time-service/models/work-time-info';
import { I18nPluralPipe } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { DynamicFilterComponent } from '../dynamic-filter/dynamic-filter.component';
import { ManagerTimelistService } from './manager-timelist.service';
import { TimeService } from './time.service';
import { UserStat } from './models/user-stat';
import { TIMELIST_ENTITY_INFO, TimelistEntityInfo } from './models/timelist-entity-info';

@Component({
	selector: 'do-team-statistics',
	templateUrl: './manager-timelist.component.html',
	styleUrls: ['./manager-timelist.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ManagerTimelistService, I18nPluralPipe],
})
export class ManagerTimelistComponent implements OnInit, AfterViewInit {
	public readonly Icons = Icons;
	public readonly maxDate = DateTime.now().plus({ month: 1 });

	@ViewChild(TitleDatepickerV2Component) datepicker!: TitleDatepickerV2Component;
	@ViewChild(TableComponent) table!: TableComponent<UserStat>;
	@ViewChild(DynamicFilterComponent) filter!: DynamicFilterComponent;

	public tableData = this.timelistService.getTableData();
	public filterConfig = this.timelistService.getFilters();
	public expandedRow!: ReturnType<ManagerTimelistService['getExpandedRowData']>;
	public dataSource!: TimeListDataSource;

	constructor(
		@Inject(TIMELIST_ENTITY_INFO) public entityInfo: TimelistEntityInfo,
		private timelistService: ManagerTimelistService,
		private route: ActivatedRoute,
		private timeService: TimeService
	) {}

	public ngOnInit(): void {
		const data = this.route.snapshot.data.stats;
		this.dataSource = new TimeListDataSource(data, this.timeService);
		this.expandedRow = this.timelistService.getExpandedRowData(this.dataSource);
	}

	public ngAfterViewInit(): void {
		const sort = this.table.sort;
		merge(sort.sortChange, this.filter.filterChange, this.datepicker.dateSelection)
			.pipe(
				switchMap(() => {
					const { year, month } = this.datepicker.selectDate;
					const name = this.filter.value['name'] || '';
					return this.dataSource.loadStats(this.entityInfo.entityId, month, year, sort.direction, name);
				})
			)
			.subscribe();
	}

	public handleDownload(): void {
		const entityId = this.entityInfo.entityId;
		const { year, month } = this.datepicker.selectDate;
		this.timelistService.downloadStatistics(entityId, month, year);
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
			const wt = s.workTimes.find((wt: WorkTimeInfo) => wt.id === workTime.id);
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
