import { Injectable } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { of } from 'rxjs';
import { DepartmentInfo } from '@api/department-service/models/department-info';
import { Sort, SortDirection } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@shared/component/paginator/paginator.component';
import { DoTableDataSource } from '@app/types/do-table-data-source';
import { ColumnDef } from '../../table/models';
import { FilterDef, InputFilterParams, SelectFilterParams } from '../../dynamic-filter/models';
import { DepartmentStatus, IDepartmentStatus } from '../models/department-status';
import { TableOptions } from '../../table/models/table-options';
import { DepartmentService, FindDepartmentsParams } from '../department.service';
import { ClientQueryParam } from './department-list-queries.service';

@Injectable()
export class DepartmentListService {
	private initialQueryParams = this.route.snapshot.queryParams;

	public get dataSource(): DoTableDataSource<DepartmentInfo> {
		const dataService = {
			loadData: (params: FindDepartmentsParams) => this.departmentService.findDepartments(params),
		};
		const initialValue = this.route.snapshot.data['departments'];
		return new DoTableDataSource(dataService, initialValue);
	}

	constructor(private route: ActivatedRoute, private departmentService: DepartmentService) {}

	public getInitialPaginatorValue(): PageEvent {
		return { pageIndex: this.initialQueryParams['pageIndex'], pageSize: this.initialQueryParams['pageSize'] };
	}

	public getTableOptions(): TableOptions {
		const { active, direction } = this.getInitialSort(this.initialQueryParams[ClientQueryParam.Sort]);
		return {
			sortActive: active,
			sortDirection: direction,
			rowHeight: 96,
			columns: [
				new ColumnDef({
					field: 'name',
					headerName: 'Наименование',
					sortEnabled: true,
					disableClearSort: true,
					params: { lineClamp: 3 },
				}),
				new ColumnDef({ field: 'shortName', headerName: 'Краткое наименование', params: { lineClamp: 3 } }),
				new ColumnDef({
					field: 'director',
					headerName: 'Директор',
					valueGetter: (department: DepartmentInfo) => {
						if (department.director) {
							const { firstName, lastName, middleName } = department.director;
							const nonBreakingSpace = String.fromCharCode(160);
							return `${lastName}${nonBreakingSpace}${firstName[0]}.${middleName && middleName[0] + '.'}`;
						}
						return '–';
					},
					params: { lineClamp: 3 },
				}),
				new ColumnDef({
					field: 'usersCount',
					headerName: 'Количество человек',
					type: 'textCell',
					valueGetter: (department: DepartmentInfo) => `${department.countUsers} чел.`,
				}),
				new ColumnDef({
					field: 'status',
					headerName: 'Статус',
					type: 'statusCell',
					width: 50,
					valueGetter: (department: DepartmentInfo) =>
						DepartmentStatus.getStatusColorByValue(department.isActive),
				}),
			],
		};
	}

	public getFilterData(): FilterDef[] {
		const initialValue = this.initialQueryParams;
		return [
			{
				key: ClientQueryParam.Search,
				type: 'input',
				initialValue: initialValue[ClientQueryParam.Search],
				width: 300,
				params: new InputFilterParams({ placeholder: 'Поиск', icon: Icons.Search }),
			},
			{
				key: ClientQueryParam.Status,
				type: 'select',
				initialValue: initialValue[ClientQueryParam.Status],
				width: 147,
				params: new SelectFilterParams({
					placeholder: 'Статус',
					options$: of(DepartmentStatus.getAllStatuses()),
					valueGetter: (s: IDepartmentStatus) => s.value,
					displayValueGetter: (s: IDepartmentStatus) => s.label,
					icon: Icons.Status,
					iconColor: (s: IDepartmentStatus) => s.color,
					allowReset: true,
				}),
			},
		];
	}

	private getInitialSort(sortValue?: string): Sort {
		if (!sortValue) {
			return { active: 'name', direction: 'asc' };
		}
		const [active, direction] = sortValue.split('_');
		return {
			active,
			direction: (direction === 'rand' ? '' : direction) as SortDirection,
		};
	}
}
