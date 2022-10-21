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
import { DateTime, Interval } from 'luxon';
import { LoadingState } from '@app/utils/loading-state';
import { DialogService, ModalWidth } from '@shared/component/dialog/dialog.service';
import { Icons } from '@shared/modules/icons/icons';
import { TitleDatepickerV2Component } from '@shared/component/title-datepicker/title-datepicker-v2.component';
import {
	CanManageTimeInSelectedDate,
	LeaveTimeAndDatepickerManagement,
	SubmitLeaveTimeValue,
} from '@shared/modules/shared-time-tracking-system/models';
import { TableComponent } from '../table/table.component';
import { DynamicFilterComponent } from '../dynamic-filter/dynamic-filter.component';
import {
	CanManageTimeInSelectedDateService,
	ReservedDaysStoreService,
	ManagerTimelistTableConfigService,
	TimeApiService,
	TimelistLeaveTimeDatepickerService,
} from './services';
import { TIMELIST_ENTITY_INFO, TimelistEntityInfo, TimelistEntityType, TimeListDataSource, UserStat } from './models';
import {
	AddLeaveTimeDialogComponent,
	AddLeaveTimeDialogData,
} from './add-leave-time-dialog/add-leave-time-dialog.component';

@Component({
	selector: 'do-team-statistics',
	templateUrl: './manager-timelist.component.html',
	styleUrls: ['./manager-timelist.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ReservedDaysStoreService,
		ManagerTimelistTableConfigService,
		{ provide: LeaveTimeAndDatepickerManagement, useClass: TimelistLeaveTimeDatepickerService },
		{ provide: CanManageTimeInSelectedDate, useClass: CanManageTimeInSelectedDateService },
	],
})
export class ManagerTimelistComponent extends LoadingState implements OnInit, AfterViewInit, OnDestroy {
	public readonly Icons = Icons;
	public readonly maxDate = DateTime.now().plus({ month: 1 });

	@ViewChild(TitleDatepickerV2Component) datepicker!: TitleDatepickerV2Component;
	@ViewChild(TableComponent) table!: TableComponent<UserStat>;
	@ViewChild(DynamicFilterComponent) filter!: DynamicFilterComponent;

	public pageTitle = this.getPageTitle(this.entityInfo.entityType);
	public canAddLeaveTime$ = this.canManageTime.canEdit$;

	public tableOptions = this.tableConfig.getTableOptions();
	public filterConfig = this.tableConfig.getFilters();
	public expandedRow$!: ReturnType<ManagerTimelistTableConfigService['getExpandedRowData$']>;
	public dataSource!: TimeListDataSource;

	private destroy$ = new Subject();

	constructor(
		@Inject(TIMELIST_ENTITY_INFO) public entityInfo: TimelistEntityInfo,
		private tableConfig: ManagerTimelistTableConfigService,
		private canManageTime: CanManageTimeInSelectedDate,
		private reservedDaysStore: ReservedDaysStoreService,
		private leaveTimeDatepicker: LeaveTimeAndDatepickerManagement,
		private route: ActivatedRoute,
		private dialog: DialogService,
		private timeService: TimeApiService,
		private cdr: ChangeDetectorRef,
		private vcr: ViewContainerRef
	) {
		super();
	}

	public ngOnInit(): void {
		this.route.data
			.pipe(
				tap((data) => {
					const holidays = data['holidays'];
					this.leaveTimeDatepicker.setDatepickerHolidays(holidays);

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
			this.datepicker.dateSelection.pipe(tap((d: DateTime) => this.canManageTime.setNewDate(d)))
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

	public handleRowClick(s: UserStat): void {
		this.reservedDaysStore.loadUserReservedDays(s.user.id).subscribe({
			next: (intervals: Interval[]) => {
				this.leaveTimeDatepicker.setRate(s.companyInfo.rate);
				this.leaveTimeDatepicker.setReservedDays(intervals);
			},
		});
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

	public addLeaveTimeDialog(userId: string): void {
		const data: AddLeaveTimeDialogData = {
			userId,
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
