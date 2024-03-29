import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Inject,
	OnDestroy,
	Optional,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DateTime, Interval } from 'luxon';
import { LoadingState } from '@app/utils/loading-state';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from '@app/services/current-user.service';
import { DialogService, ModalWidth } from '@shared/component/dialog/dialog.service';
import { Icons } from '@shared/modules/icons/icons';
import { TitleDatepickerV2Component } from '@shared/component/title-datepicker/title-datepicker-v2.component';
import {
	CanManageTimeInSelectedDate,
	LeaveTimeAndDatepickerManagement,
	MAX_FUTURE_DATE_FOR_LEAVE_TIME,
	SubmitLeaveTimeValue,
} from '@shared/modules/shared-time-tracking-system/models';
import { TableComponent } from '../table/table.component';
import { DynamicFilterComponent } from '../dynamic-filter/dynamic-filter.component';
import {
	ReservedDaysStoreService,
	ManagerTimelistTableConfigService,
	TimeApiService,
	TimelistLeaveTimeDatepickerService,
} from './services';
import {
	TIMELIST_ENTITY_INFO,
	TimelistEntityInfo,
	TimelistEntityType,
	TimeListDataSource,
	UserStat,
	AdditionalTimelistFilters,
} from './models';
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
		CanManageTimeInSelectedDate,
		{ provide: LeaveTimeAndDatepickerManagement, useClass: TimelistLeaveTimeDatepickerService },
	],
})
export class ManagerTimelistComponent extends LoadingState implements AfterViewInit, OnDestroy {
	public readonly Icons = Icons;
	public readonly maxDate = MAX_FUTURE_DATE_FOR_LEAVE_TIME;

	@ViewChild(TitleDatepickerV2Component) datepicker!: TitleDatepickerV2Component;
	@ViewChild(TableComponent) table!: TableComponent<UserStat>;
	@ViewChild(DynamicFilterComponent) filter!: DynamicFilterComponent;

	public pageTitle = this.getPageTitle(this.entityInfo.entityType);
	public canAddLeaveTime$ = this.canManageTime.canEdit$;
	public minDate$ = this.canManageTime.minDate$;

	public tableOptions = this.tableConfig.getTableOptions();
	public filterConfig$ = this.tableConfig.getFilters();
	public expandedRow$!: ReturnType<ManagerTimelistTableConfigService['getExpandedRowData$']>;
	public dataSource!: TimeListDataSource;

	private destroy$ = new Subject();

	constructor(
		@Inject(TIMELIST_ENTITY_INFO) public entityInfo: TimelistEntityInfo,
		@Optional() private additionalFilters: AdditionalTimelistFilters,
		private tableConfig: ManagerTimelistTableConfigService,
		private canManageTime: CanManageTimeInSelectedDate,
		private reservedDaysStore: ReservedDaysStoreService,
		private leaveTimeDatepicker: LeaveTimeAndDatepickerManagement,
		private route: ActivatedRoute,
		private currentUser: CurrentUserService,
		private dialog: DialogService,
		private timeService: TimeApiService,
		private cdr: ChangeDetectorRef,
		private vcr: ViewContainerRef
	) {
		super();
	}

	public ngAfterViewInit(): void {
		combineLatest([this.route.data, this.currentUser.user$])
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: ([data, u]: [Data, User]) => {
					const holidays = data['holidays'];
					this.leaveTimeDatepicker.setDatepickerHolidays(holidays);

					const stats = data['stats'];
					this.dataSource = new TimeListDataSource(stats, this.timeService, this.entityInfo.entityType, u);
					this.dataSource.sort = this.table.sort;
					this.dataSource.filter = this.filter;
					this.dataSource.additionalFilters = this.additionalFilters;

					this.expandedRow$ = this.tableConfig.getExpandedRowData$(this.dataSource);
					this.cdr.markForCheck();
				},
			});

		this.datepicker.dateSelection
			.pipe(tap((d: DateTime) => this.canManageTime.setNewDate(d)))
			.pipe(
				switchMap(() => {
					const { year, month } = this.datepicker.selectDate;
					return this.dataSource.loadStats(this.entityInfo.entityId, month, year);
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
