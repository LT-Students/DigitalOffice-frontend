import { Injectable } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { WorkTimeInfo } from '@api/time-service/models/work-time-info';
import { Router } from '@angular/router';
import { AppRoutes } from '@app/models/app-routes';
import { I18nPluralPipe } from '@angular/common';
import { TableOptions } from '../../table/models/table-options';
import { FilterDef, InputFilterParams } from '../../dynamic-filter/models';
import { EditableTextFieldParams } from '../../table/cell-components/editable-text-field/editable-text-field.component';
import { TextCellParams } from '../../table/cell-components/text/text.component';
import { LeaveTimeType } from './leave-time-type';
import { TimeService } from './time.service';
import { TimeListDataSource } from './team-statistics.component';
import { LeaveTime, UserStat } from './user-stat';

@Injectable()
export class TeamStatisticsService {
	constructor(private router: Router, private timeService: TimeService, private pluralPipe: I18nPluralPipe) {}

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
				{
					field: 'username',
					type: 'userInfoCell',
					headerName: 'Фио',
					valueGetter: (stats: UserStat) => ({ ...stats.user }),
					sortEnabled: true,
					headerStyle: { 'padding-left': '60px', flex: '0 0 40%' },
					columnStyle: { flex: '0 0 40%', overflow: 'hidden' },
				},
				{
					field: 'hours',
					type: 'textCell',
					headerName: 'Часы / Норма',
					valueGetter: (stats: UserStat) => {
						const userHours = this.countUserHours(stats);
						return `${userHours} / ${stats.limitInfo.normHours}`;
					},
				},
				{
					field: 'projectCount',
					type: 'textCell',
					headerName: 'Проекты',
					valueGetter: (stats: UserStat) => stats.workTimes.length,
				},
				{
					field: 'contractType',
					type: 'textCell',
					headerName: 'Тип договора',
					valueGetter: (stats: UserStat) => stats.companyInfo.contractName,
				},
				{
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
				},
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
						valueGetter: (wt: WorkTimeInfo) => wt.managerHours || wt.userHours || 0,
						params: new EditableTextFieldParams({
							updateRow: (wt: WorkTimeInfo, h: string) => dataSource.updateWorkTime(wt, +h),
						}),
					},
					{
						field: 'comment',
						type: 'showMoreTextCell',
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
						valueGetter: (lt: LeaveTime) => LeaveTimeType.getLeaveInfoByLeaveType(lt.leaveType).label,
						params: new TextCellParams({
							prefixIcon: (lt: LeaveTime) => LeaveTimeType.getLeaveInfoByLeaveType(lt.leaveType).icon,
						}),
					},
					{
						field: 'leaveDates',
						headerName: 'Даты отсутствия',
						valueGetter: (lt: LeaveTime) => this.getLeavePeriodString(lt),
					},
					{
						field: 'comment',
						type: 'showMoreTextCell',
						headerName: 'Комментарий сотрудника',
						valueGetter: (lt: LeaveTime) => lt.comment || '--',
					},
					{ field: 'spacer', type: 'iconCell', columnStyle: { flex: '0 0 48px' } },
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

	public downloadStatistics(projectId: string, month: number, year: number): void {
		this.timeService.importStats({ projectId, month, year }).subscribe({
			next: (content: string) => {
				const filename = `Statistic_${year}_${month}`;
				const mediaType = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
				const downloadLink = document.createElement('a');
				downloadLink.href = mediaType + content;
				downloadLink.download = filename;
				downloadLink.click();
				downloadLink.remove();
			},
		});
	}
}
