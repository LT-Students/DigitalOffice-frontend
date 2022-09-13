import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { Icons } from '@shared/modules/icons/icons';
import { FilterDef, InputFilterParams, SelectFilterParams } from '../../../../dynamic-filter/models';
import { IProjectStatus, ProjectStatus } from '../../../../projects/models/project-status';
import { ColumnDef, TableOptions } from '../../../../table/models';

@Injectable()
export class TableConfigsService {
	constructor() {}

	public getFilterConfig(): FilterDef[] {
		return [
			{
				key: 'status',
				type: 'select',
				width: 187,
				params: new SelectFilterParams({
					placeholder: 'Статус',
					options$: of(ProjectStatus.getAllStatuses()),
					valueGetter: (s: IProjectStatus) => s.type,
					displayValueGetter: (s: IProjectStatus) => s.label,
					icon: Icons.Status,
					iconColor: (s: IProjectStatus) => s.color,
					allowReset: true,
				}),
			},
			{
				key: 'search',
				type: 'input',
				width: 320,
				params: new InputFilterParams({ placeholder: 'поиск', icon: Icons.Search }),
			},
		];
	}

	public getTableOptions(): TableOptions {
		return {
			sortActive: 'name',
			sortDirection: 'asc',
			rowHeight: 96,
			rowStyle: {
				cursor: 'pointer',
			},
			columns: [
				new ColumnDef({
					field: 'name',
					headerName: 'Название',
					sortEnabled: true,
					disableClearSort: true,
					params: { lineClamp: 3 },
				}),
				new ColumnDef({ field: 'shortName', headerName: 'Сокращенное название', params: { lineClamp: 3 } }),
				new ColumnDef({ field: 'customer', headerName: 'Заказчик', params: { lineClamp: 3 } }),
				new ColumnDef({
					field: 'usersCount',
					headerName: 'Количество человек',
					type: 'textCell',
					valueGetter: (project: ProjectInfo) => `${project.usersCount} чел.`,
				}),
				new ColumnDef({
					field: 'status',
					headerName: 'Статус',
					type: 'statusCell',
					width: 50,
					valueGetter: (project: ProjectInfo) => ProjectStatus.getStatusColor(project.status),
				}),
			],
		};
	}
}
