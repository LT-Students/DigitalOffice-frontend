import { Injectable } from '@angular/core';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { Icons } from '@shared/modules/icons/icons';
import { DepartmentService } from '@app/services/department/department.service';
import { Observable, of } from 'rxjs';
import { AutocompleteConfigsService } from '@shared/component/autocomplete/autocomplete-configs.service';
import { DepartmentInfo } from '@api/department-service/models/department-info';
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
import { SlideToggleParams } from '../../dynamic-filter/components/slide-toggle/slide-toggle.component';
import { ClientQueryParam } from './project-table-queries.service';

@Injectable()
export class ProjectTableService {
	constructor(
		private projectService: ProjectService,
		private departmentService: DepartmentService,
		private autocompleteConfigs: AutocompleteConfigsService
	) {}

	public getTableColumns(): ColumnDef[] {
		return [
			new ColumnDef({ field: 'name', headerName: 'Название', sortEnabled: true, params: { lineClamp: 3 } }),
			new ColumnDef({ field: 'shortName', headerName: 'Сокращенное название', params: { lineClamp: 3 } }),
			new ColumnDef({ field: 'customer', headerName: 'Заказчик', params: { lineClamp: 3 } }),
			new ColumnDef({
				field: 'department',
				headerName: 'Департамент',
				valueGetter: (project: ProjectInfo) => project.department?.shortName,
			}),
			new ColumnDef({
				field: 'usersCount',
				headerName: 'Количество человек',
				type: 'textCell',
				valueGetter: (project: ProjectInfo) => `${project.usersCount} чел`,
			}),
			new ColumnDef({
				field: 'status',
				headerName: 'Статус',
				type: 'statusCell',
				width: 50,
				valueGetter: (project: ProjectInfo) => ProjectStatus.getStatusColor(project.status),
			}),
		];
	}

	public getFilterData(initialValue: FilterEvent, departments$: Observable<DepartmentInfo[]>): FilterDef[] {
		return [
			{
				key: ClientQueryParam.Department,
				type: 'autocomplete',
				initialValue: initialValue[ClientQueryParam.Department],
				width: 247,
				params: new AutocompleteFilterParams({
					placeholder: 'Название департамента',
					...this.autocompleteConfigs.getDepartmentsConfig(),
					options$: departments$,
				}),
			},
			{
				key: ClientQueryParam.Status,
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
				key: ClientQueryParam.Search,
				type: 'input',
				initialValue: initialValue[ClientQueryParam.Search],
				params: new InputFilterParams({ placeholder: 'Поиск', icon: Icons.Search }),
			},
			{
				key: ClientQueryParam.AllProjects,
				type: 'buttonToggle',
				initialValue: !initialValue[ClientQueryParam.AllProjects],
				params: new SlideToggleParams({ placeholder: 'Мои проекты' }),
			},
		];
	}
}
