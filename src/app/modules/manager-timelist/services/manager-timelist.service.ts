import { Inject, Injectable } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { WorkTimeInfo } from '@api/time-service/models/work-time-info';
import { Router } from '@angular/router';
import { AppRoutes } from '@app/models/app-routes';
import { I18nPluralPipe } from '@angular/common';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TableOptions } from '../../table/models/table-options';
import { FilterDef, InputFilterParams } from '../../dynamic-filter/models';
import { EditableTextFieldParams } from '../../table/cell-components/editable-text-field/editable-text-field.component';
import { TextCellParams } from '../../table/cell-components/text/text.component';
import { LeaveTimeType } from '../models/leave-time-type';
import { TimeListDataSource } from '../manager-timelist.component';
import { LeaveTime, UserStat } from '../models/user-stat';
import { TIMELIST_ENTITY_INFO, TimelistEntityInfo } from '../models/timelist-entity';
import { ColumnDef } from '../../table/models';
import { TimeService } from './time.service';

@Injectable()
export class ManagerTimelistService {
	constructor(
		@Inject(TIMELIST_ENTITY_INFO) public entityInfo: TimelistEntityInfo,
		private router: Router,
		private timeService: TimeService,
		private pluralPipe: I18nPluralPipe
	) {}

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

	private getLeavePeriodString(lt: LeaveTime): string {
		const startDate = lt.startDate.toFormat('d.MM.yy');
		const endDate = lt.endDate.toFormat('d.MM.yy');
		const hoursPlural = this.pluralPipe.transform(lt.hours, {
			one: '# час',
			few: '# часа',
			other: '# часов',
		});
		return `${startDate} - ${endDate}\n(${hoursPlural})`;
	}

	public getTableData(): TableOptions {
		return {
			columns: [
				new ColumnDef({
					field: 'username',
					type: 'userInfoCell',
					headerName: 'Фио',
					valueGetter: (stats: UserStat) => ({ ...stats.user }),
					sortEnabled: true,
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

	public getExpandedRowData(dataSource: TimeListDataSource): { workTimes: TableOptions; leaveTimes: TableOptions } {
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
						valueGetter: (wt: WorkTimeInfo) => wt.managerHours || wt.userHours || 0,
						params: new EditableTextFieldParams({
							updateRow: (wt: WorkTimeInfo, h: string) => dataSource.updateWorkTime(wt, +h),
						}),
					}),
					new ColumnDef({
						field: 'comment',
						type: 'showMoreTextCell',
						headerName: 'Комментарий сотрудника',
						valueGetter: (wt: WorkTimeInfo) => wt.description || '--',
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
						valueGetter: (lt: LeaveTime) => LeaveTimeType.getLeaveInfoByLeaveType(lt.leaveType).label,
						params: new TextCellParams({
							prefixIcon: (lt: LeaveTime) => LeaveTimeType.getLeaveInfoByLeaveType(lt.leaveType).icon,
						}),
					}),
					new ColumnDef({
						field: 'leaveDates',
						headerName: 'Даты отсутствия',
						valueGetter: (lt: LeaveTime) => this.getLeavePeriodString(lt),
					}),
					new ColumnDef({
						field: 'comment',
						type: 'showMoreTextCell',
						headerName: 'Комментарий сотрудника',
						valueGetter: (lt: LeaveTime) => lt.comment || '--',
					}),
					new ColumnDef({ field: 'spacer', type: 'iconCell', columnStyle: { flex: '0 0 48px' } }),
				],
			},
		};
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

	public downloadStatistics(entityId: string, month: number, year: number): Observable<string> {
		return this.timeService.importStats(this.entityInfo.entityType, entityId, { month, year }).pipe(
			tap((content: string) => {
				const filename = `Statistic_${year}_${month}`;
				const mediaType = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
				const downloadLink = document.createElement('a');
				downloadLink.href = mediaType + content;
				downloadLink.download = filename;
				downloadLink.click();
				downloadLink.remove();
			})
		);
	}
}
