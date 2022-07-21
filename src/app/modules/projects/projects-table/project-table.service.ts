import { Injectable } from '@angular/core';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { Icons } from '@shared/modules/icons/icons';
import { DepartmentService } from '@app/services/department/department.service';
import { DepartmentInfo } from '@api/department-service/models/department-info';
import { of } from 'rxjs';
import { ColumnDef } from '../../table/models';
import {
	AutocompleteFilterParams,
	FilterDef,
	InputFilterParams,
	SelectFilterParams,
} from '../../dynamic-filter/models';
import { IProjectStatus, ProjectStatus } from '../models/project-status';
import { ProjectService } from '../project.service';
import { FilterEvent } from '../../dynamic-filter/dynamic-filter.component';
import { ClientQueryParam } from './project-table-queries.service';

@Injectable()
export class ProjectTableService {
	constructor(private projectService: ProjectService, private departmentService: DepartmentService) {}

	public getTableColumns(): ColumnDef[] {
		return [
			{ field: 'name', headerName: 'Название', sortEnabled: true, params: { lineClamp: 3 } },
			{ field: 'shortName', headerName: 'Сокращенное название', params: { lineClamp: 3 } },
			{ field: 'customer', headerName: 'Заказчик', params: { lineClamp: 3 } },
			{
				field: 'department',
				headerName: 'Департамент',
				valueGetter: (project: ProjectInfo) => project.department?.shortName,
			},
			{
				field: 'usersCount',
				headerName: 'Количество человек',
				type: 'textCell',
				valueGetter: (project: ProjectInfo) => `${project.usersCount} чел`,
			},
			{
				field: 'status',
				headerName: 'Статус',
				type: 'statusCell',
				width: 50,
				valueGetter: (project: ProjectInfo) => ProjectStatus.getStatusColor(project.status),
			},
		];
	}

	public getFilterData(initialValue: FilterEvent): FilterDef[] {
		return [
			{
				key: 'department',
				type: 'autocomplete',
				initialValue: initialValue[ClientQueryParam.Department],
				width: 247,
				params: new AutocompleteFilterParams({
					placeholder: 'Название департамента',
					loadOptions$: this.departmentService.findDepartments.bind(this.departmentService),
					valueGetter: (d: DepartmentInfo | null) => d?.id,
					displayValueGetter: (d: DepartmentInfo) => d.shortName,
					displayWithFn: (d: DepartmentInfo | null) => d?.shortName || '',
				}),
			},
			{
				key: 'status',
				type: 'select',
				initialValue: initialValue[ClientQueryParam.Status],
				width: 177,
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
				initialValue: initialValue[ClientQueryParam.Search],
				params: new InputFilterParams({ placeholder: 'Поиск', icon: Icons.Search }),
			},
		];
	}
}
