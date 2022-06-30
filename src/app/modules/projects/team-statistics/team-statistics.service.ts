import { Injectable } from '@angular/core';
import { Icons } from '@shared/features/icons/icons';
import { UserStatInfo } from '@api/time-service/models/user-stat-info';
import { LeaveTimeInfo } from '@api/time-service/models/leave-time-info';
import { WorkTimeInfo } from '@api/time-service/models/work-time-info';
import { DateTime } from 'luxon';
import { Router } from '@angular/router';
import { AppRoutes } from '@app/models/app-routes';
import { TableOptions } from '../../table/models/table-options';
import { FilterDef, InputFilterParams } from '../../dynamic-filter/models';

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

	public getTableData(): TableOptions {
		return {
			columns: [
				{
					field: 'username',
					type: 'userInfoCell',
					headerName: 'ФИО',
					valueGetter: (stats: UserStatInfo) => stats.user,
				},
				{
					field: 'hours',
					type: 'textCell',
					headerName: 'Часы за проект / Норма',
					valueGetter: (stats: UserStatInfo) => {
						const userHours = this.countUserHours(stats);
						return `${userHours} / ${stats.limitInfo.normHours}`;
					},
				},
				{
					field: 'leaves',
					type: 'leaveTimes',
					headerName: 'Отсутствия / Кол-во',
					valueGetter: (stats: UserStatInfo) => stats.leaveTimes,
				},
				{
					field: 'projectCount',
					type: 'textCell',
					headerName: 'Кол-во проектов',
					valueGetter: (stats: UserStatInfo) => `${stats.workTimes.length} проект(ов)`,
				},
			],
			rowStyle: {
				'min-height': '96px',
			},
			isRowExpandable: () => true,
			expandedRowOptions: {
				columns: [
					{
						field: 'projectName',
						type: 'textCell',
						headerName: 'Название проекта',
						valueGetter: (wt: WorkTimeInfo) => wt.project?.name || 'Другое',
					},
					{
						field: 'projectHours',
						headerName: 'Часы за проект',
						valueGetter: (wt: WorkTimeInfo) => wt.managerHours || wt.userHours,
					},
					{
						field: 'link',
						type: 'iconButtonCell',
						valueGetter: (wt: WorkTimeInfo) => wt,
						params: {
							icon: () => Icons.Go,
							onClickFn: (wt: WorkTimeInfo) =>
								this.router.navigateByUrl(`/${AppRoutes.Projects}/${wt.project?.id}`),
						},
					},
				],
				dataSourceGetter: (stats: UserStatInfo) => stats.workTimes,
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
