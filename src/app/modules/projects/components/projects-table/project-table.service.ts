import { Injectable } from '@angular/core';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { Icons } from '@shared/features/icons/icons';
import { DepartmentService } from '@app/services/department/department.service';
import { DepartmentInfo } from '@api/department-service/models/department-info';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { IFindProjects, ProjectService } from '@app/services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { LoadDataFn } from '@app/services/infinite-scroll-data-provider.service';
import { ColumnDef } from '../../../table/models';
import {
	AutocompleteFilterParams,
	FilterDef,
	InputFilterParams,
	SelectFilterParams,
} from '../../../dynamic-filter/models';
import { IProjectStatus, ProjectStatus } from './project-status';

@Injectable()
export class ProjectTableService {
	public loadDataFn: LoadDataFn<ProjectInfo> = (params: IFindProjects, isFirst: boolean) => {
		return isFirst
			? this.route.data.pipe(map((response) => response.projects))
			: this.projectService.findProjects(params);
	};

	constructor(
		private projectService: ProjectService,
		private departmentService: DepartmentService,
		private route: ActivatedRoute
	) {}

	public getTableColumns(): ColumnDef[] {
		return [
			{ field: 'name', headerName: 'Название', params: { lineClamp: 3 } },
			{ field: 'shortName', headerName: 'Сокращенное название', params: { lineClamp: 3 } },
			{ field: 'customer', headerName: 'Заказчик', params: { lineClamp: 3 } },
			{
				field: 'department',
				headerName: 'Департамент',
				valueGetter: (project: ProjectInfo) => project.department?.name,
			},
			{ field: 'userCount', headerName: 'Количество человек', type: 'textCell' },
			{
				field: 'status',
				headerName: 'Статус',
				type: 'statusCell',
				width: 50,
				valueGetter: (project: ProjectInfo) => ProjectStatus.getStatusColor(project.status),
			},
		];
	}

	public getFilterData(): FilterDef[] {
		return [
			{
				key: 'department',
				type: 'autocomplete',
				width: 247,
				params: new AutocompleteFilterParams({
					placeholder: 'Название департамента',
					loadOptions$: this.departmentService.findDepartments.bind(this.departmentService),
					valueGetter: (d: DepartmentInfo) => d.id,
					displayValueGetter: (d: DepartmentInfo) => d.shortName,
					displayWithFn: (d: DepartmentInfo | null) => d?.shortName || '',
				}),
			},
			{
				key: 'projectstatus',
				type: 'select',
				width: 177,
				params: new SelectFilterParams({
					placeholder: 'Статус',
					options$: of(ProjectStatus.getAllStatuses()),
					valueGetter: (s: IProjectStatus) => s.status,
					displayValueGetter: (s: IProjectStatus) => s.label,
					icon: Icons.Status,
					iconColor: (s: IProjectStatus) => s.color,
					allowReset: true,
				}),
			},
			{
				key: 'nameincludesubstring',
				type: 'input',
				params: new InputFilterParams({ placeholder: 'Поиск', icon: Icons.Search }),
			},
			{ key: 'isascendingsort', type: 'alphabetSort' },
		];
	}
}
