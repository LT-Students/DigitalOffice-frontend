import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { WorkTimeInfo } from '@api/time-service/models/work-time-info';
import { AppRoutes } from '@app/models/app-routes';
import { Icons } from '@shared/modules/icons/icons';
import { ConfirmDialogData } from '@shared/dialogs/confirm-dialog/confirm-dialog.component';
import { DialogService } from '@shared/component/dialog/dialog.service';
import { FilterDef, InputFilterParams } from '../../dynamic-filter/models';
import { EditableTextFieldParams } from '../../table/cell-components/editable-text-field/editable-text-field.component';
import { TextCellParams } from '../../table/cell-components/text/text.component';
import { LeaveTimeType } from '../models/leave-time-type';
import { LeaveTime, UserStat } from '../models/user-stat';
import { ColumnDef, TableOptions } from '../../table/models';
import { TimeListDataSource } from '../models/timelist-datasource';
import { IconButtonParams } from '../../table/cell-components/icon-button/icon-button.component';
import { ShowMoreTextParams } from '../../table/cell-components/show-more-text/show-more-text.component';
import { EditableDateRangeParams } from '../../table/cell-components/editable-text-field/editable-date-range.component';
import { TimeService } from './time.service';
import { ManagerTimelistService } from './manager-timelist.service';

@Injectable()
export class ManagerTimelistTableConfigService {
	constructor(
		private router: Router,
		private dialog: DialogService,
		private timeService: TimeService,
		private timelistService: ManagerTimelistService
	) {}

	public getTableData(): TableOptions {
		return {
			sortActive: 'username',
			sortDirection: 'asc',
			columns: [
				new ColumnDef({
					field: 'username',
					type: 'userInfoCell',
					headerName: 'Фио',
					valueGetter: (stats: UserStat) => ({ ...stats.user }),
					sortEnabled: true,
					disableClearSort: true,
					headerStyle: { 'padding-left': '60px', flex: '0 0 40%' },
					columnStyle: { flex: '0 0 40%', overflow: 'hidden' },
				}),
				new ColumnDef({
					field: 'hours',
					type: 'textCell',
					headerName: 'Часы / Норма',
					valueGetter: (stats: UserStat) => {
						const userHours = this.countUserHours(stats);
						const normHours = stats.limitInfo.normHours;
						const rate = stats.companyInfo.rate;
						return `${userHours} / ${normHours * rate}`;
					},
				}),
				new ColumnDef({
					field: 'projectCount',
					type: 'textCell',
					headerName: 'Проекты',
					valueGetter: (stats: UserStat) => stats.workTimes.length,
				}),
				new ColumnDef({
					field: 'contractType',
					type: 'textCell',
					headerName: 'Тип договора',
					valueGetter: (stats: UserStat) => stats.companyInfo.contractName,
				}),
				new ColumnDef({
					field: 'link',
					type: 'iconButtonCell',
					valueGetter: (stats: UserStat) => stats,
					headerStyle: { flex: '0 0 48px' },
					columnStyle: { flex: '0 0 auto' },
					params: {
						icon: () => Icons.Go,
						onClickFn: (stats: UserStat) =>
							this.router.navigateByUrl(`/${AppRoutes.Users}/${stats.user.id}`),
					},
				}),
			],
			rowStyle: {
				'min-height': '64px',
			},
			isRowExpandable: () => true,
			expandedRowComparator: ([expandedRow, row]: [UserStat | null, UserStat]) =>
				expandedRow?.user.id === row.user.id,
		};
	}

	public getExpandedRowData$(
		dataSource: TimeListDataSource
	): Observable<{ workTimes: TableOptions; leaveTimes: TableOptions }> {
		return this.timelistService.canEdit$.pipe(
			map((canEdit: boolean) => {
				return {
					workTimes: {
						rowClass: 'timelist',
						rowStyle: { 'min-height': '38px' },
						columns: [
							new ColumnDef({
								field: 'entityName',
								type: 'textCell',
								headerName: 'Название проекта',
								columnStyle: { flex: '0 0 40%', overflow: 'hidden' },
								valueGetter: (wt: WorkTimeInfo) => wt.project?.name || 'Другое',
							}),
							new ColumnDef({
								field: 'entityHours',
								type: 'editableTimeCell',
								headerName: 'Внесённые часы',
								valueGetter: (wt: WorkTimeInfo) =>
									wt.managerHours != null ? wt.managerHours : wt.userHours || 0,
								params: new EditableTextFieldParams({
									updateRow: (wt: WorkTimeInfo, h: string) => dataSource.updateWorkTimeHours(wt, +h),
									disabled: !canEdit,
								}),
							}),
							new ColumnDef({
								field: 'comment',
								type: 'showMoreTextCell',
								headerName: 'Комментарий сотрудника',
								valueGetter: (wt: WorkTimeInfo) =>
									wt.managerDescription != null ? wt.managerDescription : wt.description,
								params: new ShowMoreTextParams({
									editEnabled: canEdit,
									updateRow: (wt: WorkTimeInfo, c: string) => dataSource.updateWorkTimeComment(wt, c),
								}),
							}),
							new ColumnDef({
								field: 'link',
								type: 'iconButtonCell',
								valueGetter: (wt: WorkTimeInfo) => wt,
								headerStyle: { flex: '0 0 48px' },
								columnStyle: { flex: '0 0 auto' },
								params: {
									icon: () => Icons.Go,
									onClickFn: (wt: WorkTimeInfo) =>
										this.router.navigateByUrl(`/${AppRoutes.Projects}/${wt.project?.id}`),
								},
							}),
						],
					},
					leaveTimes: {
						rowClass: 'timelist',
						rowStyle: { 'min-height': '38px' },
						columns: [
							new ColumnDef({
								field: 'leaveType',
								type: 'textCell',
								headerName: 'Тип отсутствия',
								columnStyle: { flex: '0 0 40%', overflow: 'hidden' },
								valueGetter: (lt: LeaveTime) =>
									LeaveTimeType.getLeaveInfoByLeaveType(lt.leaveType).label,
								params: new TextCellParams({
									prefixIcon: (lt: LeaveTime) =>
										LeaveTimeType.getLeaveInfoByLeaveType(lt.leaveType).icon,
								}),
							}),
							new ColumnDef({
								field: 'leaveDates',
								type: 'editableDateRangeCell',
								headerName: 'Даты отсутствия',
								valueGetter: (lt: LeaveTime) => lt,
								params: new EditableDateRangeParams({
									disabled: !canEdit,
									minDate: this.timelistService.getMinDate(),
									maxDate: DateTime.now().plus({ month: 1 }).endOf('month'),
									updateRow: (
										lt: LeaveTime,
										interval: { startDate: DateTime; endDate: DateTime; hours: number }
									) => {
										dataSource.updateLeaveTimeDates(lt, interval);
									},
								}),
							}),
							new ColumnDef({
								field: 'comment',
								type: 'showMoreTextCell',
								headerName: 'Комментарий сотрудника',
								valueGetter: (lt: LeaveTime) => lt.comment,
								params: new ShowMoreTextParams({
									editEnabled: canEdit,
									updateRow: (lt: LeaveTime, c: string) => dataSource.updateLeaveTimeComment(lt, c),
								}),
							}),
							canEdit
								? new ColumnDef({
										field: 'delete',
										type: 'iconButtonCell',
										valueGetter: (lt: LeaveTime) => lt,
										columnStyle: { flex: '0 0 48px' },
										params: new IconButtonParams({
											icon: () => Icons.Delete,
											onClickFn: (lt: LeaveTime) => {
												this.warnOnDelete().subscribe({
													next: (confirmed?: boolean) =>
														confirmed && dataSource.deleteLeaveTime(lt.id),
												});
											},
										}),
								  })
								: new ColumnDef({
										field: 'spacer',
										type: 'iconCell',
										columnStyle: { flex: '0 0 48px' },
								  }),
						],
					},
				};
			})
		);
	}

	public getFilters(): FilterDef[] {
		return [
			{
				key: 'name',
				type: 'input',
				width: 267,
				params: new InputFilterParams({ icon: Icons.Search, placeholder: 'Поиск по имени и фамилии' }),
			},
		];
	}

	private countUserHours(stats: UserStat): number {
		const workHours = stats.workTimes.reduce((acc: number, wt: WorkTimeInfo) => {
			const hours = wt.managerHours ?? wt.userHours ?? 0;
			return acc + hours;
		}, 0);
		const leaveHours = stats.leaveTimes.reduce((acc: number, lt: LeaveTime) => {
			const hours = lt.hours;
			return acc + Math.floor(hours);
		}, 0);

		return workHours + leaveHours;
	}

	private warnOnDelete(): Observable<boolean | undefined> {
		const confirmDialogData: ConfirmDialogData = {
			title: 'Удаление записи',
			confirmText: 'Да, удалить',
			message: 'Вы действительно хотите удалить запись об отсутствии? Отменить это действие будет невозможно.',
		};

		return this.dialog.confirm<boolean>(confirmDialogData).closed;
	}
}
