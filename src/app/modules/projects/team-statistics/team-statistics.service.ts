import { Injectable } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { UserStatInfo } from '@api/time-service/models/user-stat-info';
import { LeaveTimeInfo } from '@api/time-service/models/leave-time-info';
import { WorkTimeInfo } from '@api/time-service/models/work-time-info';
import { DateTime } from 'luxon';
import { Router } from '@angular/router';
import { AppRoutes } from '@app/models/app-routes';
import { TableOptions } from '../../table/models/table-options';
import { FilterDef, InputFilterParams } from '../../dynamic-filter/models';
import { EditableTextFieldParams } from '../../table/cell-components/editable-text-field/editable-text-field.component';
import { TextCellParams } from '../../table/cell-components/text/text.component';
import { LeaveTimeType } from './leave-time-type';

@Injectable()
export class TeamStatisticsService {
	constructor(private router: Router) {}

	private countUserHours(stats: UserStatInfo): number {
		const workHours = stats.workTimes.reduce((acc: number, wt: WorkTimeInfo) => {
			const hours = wt.managerHours ?? wt.userHours ?? 0;
			return acc + hours;
		}, 0);
		const leaveHours = stats.leaveTimes.reduce((acc: number, lt: LeaveTimeInfo) => {
			const startDate = DateTime.fromISO(lt.startTime);
			const endDate = DateTime.fromISO(lt.endTime).plus({ day: 1 });
			const hours = endDate.diff(startDate).as('days') * 8;
			return acc + Math.floor(hours);
		}, 0);

		return workHours + leaveHours;
	}

	private getLeavePeriodString(lt: LeaveTimeInfo): string {
		const startDate = DateTime.fromISO(lt.startTime).toFormat('d.MM.yy');
		const endDate = DateTime.fromISO(lt.endTime).toFormat('d.MM.yy');
		return `${startDate} - ${endDate}\n(${lt.minutes / 60} часов)`;
	}

	public getTableData(): TableOptions {
		return {
			columns: [
				{
					field: 'username',
					type: 'userInfoCell',
					headerName: 'Фио',
					valueGetter: (stats: UserStatInfo) => ({ ...stats.user, position: stats.position }),
					sortEnabled: true,
					headerStyle: { 'padding-left': '60px', flex: '0 0 40%' },
					columnStyle: { flex: '0 0 40%', overflow: 'hidden' },
				},
				{
					field: 'hours',
					type: 'textCell',
					headerName: 'Часы / Норма',
					valueGetter: (stats: UserStatInfo) => {
						const userHours = this.countUserHours(stats);
						return `${userHours} / ${stats.limitInfo.normHours}`;
					},
				},
				{
					field: 'projectCount',
					type: 'textCell',
					headerName: 'Проекты',
					valueGetter: (stats: UserStatInfo) => stats.workTimes.length,
				},
				{
					field: 'contractType',
					type: 'textCell',
					headerName: 'Тип договора',
					valueGetter: (stats: UserStatInfo) => stats.companyUser?.contractSubjectData?.name,
				},
				{
					field: 'link',
					type: 'iconButtonCell',
					valueGetter: (stats: UserStatInfo) => stats,
					headerStyle: { flex: '0 0 48px' },
					columnStyle: { flex: '0 0 auto' },
					params: {
						icon: () => Icons.Go,
						onClickFn: (stats: UserStatInfo) =>
							this.router.navigateByUrl(`/${AppRoutes.Users}/${stats.user.id}`),
					},
				},
			],
			rowStyle: {
				'min-height': '64px',
			},
			isRowExpandable: () => true,
		};
	}

	public getExpandedRowData(): { workTimes: TableOptions; leaveTimes: TableOptions } {
		return {
			workTimes: {
				rowClass: 'timelist',
				rowStyle: { 'min-height': '38px' },
				columns: [
					{
						field: 'projectName',
						type: 'textCell',
						headerName: 'Название проекта',
						columnStyle: { flex: '0 0 40%', overflow: 'hidden' },
						valueGetter: (wt: WorkTimeInfo) => wt.project?.name || 'Другое',
					},
					{
						field: 'projectHours',
						type: 'editableTimeCell',
						headerName: 'Внесённые часы',
						valueGetter: (wt: WorkTimeInfo) => wt.managerHours || wt.userHours,
						params: new EditableTextFieldParams({ updateRow: (wt: WorkTimeInfo, h: string) => {} }),
					},
					{
						field: 'comment',
						headerName: 'Комментарий сотрудника',
						valueGetter: (wt: WorkTimeInfo) => wt.description || '--',
					},
					{
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
					},
				],
			},
			leaveTimes: {
				rowClass: 'timelist',
				rowStyle: { 'min-height': '38px' },
				columns: [
					{
						field: 'leaveType',
						type: 'textCell',
						headerName: 'Тип отсутствия',
						columnStyle: { flex: '0 0 40%', overflow: 'hidden' },
						valueGetter: (lt: LeaveTimeInfo) => LeaveTimeType.getLeaveInfoByLeaveType(lt.leaveType).label,
						params: new TextCellParams({
							prefixIcon: (lt: LeaveTimeInfo) => LeaveTimeType.getLeaveInfoByLeaveType(lt.leaveType).icon,
						}),
					},
					{
						field: 'leaveDates',
						headerName: 'Даты отсутствия',
						valueGetter: (lt: LeaveTimeInfo) => this.getLeavePeriodString(lt),
					},
					{
						field: 'comment',
						headerName: 'Комментарий сотрудника',
						valueGetter: (lt: LeaveTimeInfo) => lt.comment || '--',
					},
					{ field: 'spacer', type: 'iconCell', columnStyle: { flex: '0 0 48px' } },
				],
			},
		};
	}

	public getFilters(): FilterDef[] {
		return [
			{
				key: 'nameincludesubstring',
				type: 'input',
				width: 267,
				params: new InputFilterParams({ icon: Icons.Search, placeholder: 'Поиск по имени и фамилии' }),
			},
		];
	}
}
