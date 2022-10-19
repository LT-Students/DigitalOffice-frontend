import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Inject,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge, Subject } from 'rxjs';
import { finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { WorkTimeMonthLimitInfo } from '@api/time-service/models';
import { LoadingState } from '@app/utils/loading-state';
import { DialogService, ModalWidth } from '@shared/component/dialog/dialog.service';
import { Icons } from '@shared/modules/icons/icons';
import { TitleDatepickerV2Component } from '@shared/component/title-datepicker/title-datepicker-v2.component';
import { TableComponent } from '../table/table.component';
import { DynamicFilterComponent } from '../dynamic-filter/dynamic-filter.component';
import { AttendanceService, SubmitLeaveTimeValue } from '../time-tracker/services/attendance.service';
import { ManagerTimelistTableConfigService } from './services/manager-timelist-table-config.service';
import { TimeService } from './services/time.service';
import { UserStat } from './models/user-stat';
import { TIMELIST_ENTITY_INFO, TimelistEntityInfo, TimelistEntityType } from './models/timelist-entity';
import { AddLeaveTimeDialogService } from './add-leave-time-dialog/add-leave-time-dialog.service';
import { TimeListDataSource } from './models/timelist-datasource';
import { AddLeaveTimeDialogComponent, DialogData } from './add-leave-time-dialog/add-leave-time-dialog.component';
import { ManagerTimelistService } from './services/manager-timelist.service';

@Component({
	selector: 'do-team-statistics',
	templateUrl: './manager-timelist.component.html',
	styleUrls: ['./manager-timelist.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ManagerTimelistService,
		ManagerTimelistTableConfigService,
		{ provide: AttendanceService, useExisting: AddLeaveTimeDialogService },
	],
})
export class ManagerTimelistComponent extends LoadingState implements OnInit, AfterViewInit, OnDestroy {
	public readonly Icons = Icons;
	public readonly maxDate = DateTime.now().plus({ month: 1 });

	@ViewChild(TitleDatepickerV2Component) datepicker!: TitleDatepickerV2Component;
	@ViewChild(TableComponent) table!: TableComponent<UserStat>;
	@ViewChild(DynamicFilterComponent) filter!: DynamicFilterComponent;

	public pageTitle = this.getPageTitle(this.entityInfo.entityType);
	public canAddLeaveTime$ = this.canManageTimelist.canEdit$;

	public tableData = this.tableConfig.getTableData();
	public filterConfig = this.tableConfig.getFilters();
	public expandedRow$!: ReturnType<ManagerTimelistTableConfigService['getExpandedRowData$']>;
	public dataSource!: TimeListDataSource;

	private holidays!: (WorkTimeMonthLimitInfo | null)[];
	private destroy$ = new Subject();

	constructor(
		@Inject(TIMELIST_ENTITY_INFO) public entityInfo: TimelistEntityInfo,
		private tableConfig: ManagerTimelistTableConfigService,
		private canManageTimelist: ManagerTimelistService,
		private route: ActivatedRoute,
		private dialog: DialogService,
		private timeService: TimeService,
		private cdr: ChangeDetectorRef,
		private vcr: ViewContainerRef
	) {
		super();
	}

	public ngOnInit(): void {
		// this.timeService.findHolidaysForThreeMonths().subscribe((holidays) => (this.holidays = holidays));
		this.route.data
			.pipe(
				tap((data) => {
					const stats = data['stats'];
					this.dataSource = new TimeListDataSource(stats, this.timeService, this.entityInfo.entityType);
					this.expandedRow$ = this.tableConfig.getExpandedRowData$(this.dataSource);
					this.cdr.markForCheck();
				}),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	public ngAfterViewInit(): void {
		const sort = this.table.sort;
		merge(
			sort.sortChange,
			this.filter.filterChange,
			this.datepicker.dateSelection.pipe(tap((d: DateTime) => this.canManageTimelist.setNewDate(d)))
		)
			.pipe(
				switchMap(() => {
					const { year, month } = this.datepicker.selectDate;
					const name = this.filter.value['name'] || '';
					return this.dataSource.loadStats(this.entityInfo.entityId, month, year, sort.direction, name);
				}),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public handleDownload(): void {
		this.setLoading(true);
		const { entityType, entityId } = this.entityInfo;
		const { year, month } = this.datepicker.selectDate;
		this.timeService
			.importStats(entityType, entityId, { month, year })
			.pipe(finalize(() => this.setLoading(false)))
			.subscribe();
	}

	public addLeaveTimeDialog(userId: string, rate: number): void {
		const data: DialogData = {
			userId,
			rate,
			holidays: this.holidays,
		};
		this.dialog
			.open<Required<SubmitLeaveTimeValue>>(AddLeaveTimeDialogComponent, {
				width: ModalWidth.M,
				viewContainerRef: this.vcr,
				data,
			})
			.closed.subscribe({
				next: (lt?: Required<SubmitLeaveTimeValue>) => {
					if (lt) {
						this.dataSource.addLeaveTime(userId, {
							id: lt.leaveTimeId,
							leaveType: lt.leaveType,
							startDate: lt.startTime,
							endDate: lt.endTime,
							hours: lt.minutes / 60,
							comment: lt.comment || undefined,
						});
					}
				},
			});
	}

	private getPageTitle(entityType: TimelistEntityType): string {
		switch (entityType) {
			case TimelistEntityType.Department:
				return 'Таймлист ДД';
			case TimelistEntityType.Project:
				return 'Статистика команды';
			default:
				return 'Статистика команды';
		}
	}
}
