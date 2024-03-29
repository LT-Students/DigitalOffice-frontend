import { Injectable } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { Observable, of } from 'rxjs';
import { DepartmentInfo } from '@api/department-service/models/department-info';
import { Sort, SortDirection } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@shared/component/paginator/paginator.component';
import { PermissionService } from '@app/services/permission.service';
import { map } from 'rxjs/operators';
import { UserRights } from '@app/types/user-rights.enum';
import { booleanGuard } from '@app/utils/utils';
import { ColumnDef, TableOptions } from '../../table/models';
import { FilterDef, InputFilterParams, SelectFilterParams } from '../../dynamic-filter/models';
import { DepartmentStatus, IDepartmentStatus } from '../models/department-status';
import { ClientQueryParam } from './department-list-queries.service';

@Injectable()
export class DepartmentListService {
	private initialQueryParams = this.route.snapshot.queryParams;

	constructor(private route: ActivatedRoute, private permission: PermissionService) {}

	public getInitialPaginatorValue(): PageEvent {
		return { pageIndex: this.initialQueryParams['pageIndex'], pageSize: this.initialQueryParams['pageSize'] };
	}

	public getTableOptions$(): Observable<TableOptions> {
		const { active, direction } = this.getInitialSort(this.initialQueryParams[ClientQueryParam.Sort]);
		return this.permission.checkPermission$(UserRights.AddEditRemoveDepartment).pipe(
			map((hasRights: boolean) => {
				return {
					sortActive: active,
					sortDirection: direction,
					rowHeight: 96,
					rowStyle: {
						cursor: 'pointer',
					},
					columns: [
						new ColumnDef({
							field: 'name',
							headerName: 'Наименование',
							sortEnabled: true,
							disableClearSort: true,
							columnStyle: {
								flex: 1.3,
							},
							params: { lineClamp: 3 },
						}),
						new ColumnDef({
							field: 'shortName',
							headerName: 'Краткое наименование',
							columnStyle: {
								flex: 1.1,
							},
							params: { lineClamp: 3 },
						}),
						new ColumnDef({
							field: 'director',
							headerName: 'Директор',
							columnStyle: {
								flex: 0.8,
							},
							valueGetter: (department: DepartmentInfo) => {
								if (department.director) {
									const { firstName, lastName, middleName } = department.director;
									const nonBreakingSpace = String.fromCharCode(160);
									const initials = [firstName, middleName]
										.filter(booleanGuard)
										.map((s) => s[0] + '.')
										.join('');
									return `${lastName}${nonBreakingSpace}${initials}`;
								}
								return '–';
							},
							params: { lineClamp: 3 },
						}),
						new ColumnDef({
							field: 'usersCount',
							headerName: 'Количество человек',
							type: 'textCell',
							columnStyle: {
								display: 'flex',
								'justify-content': 'center',
							},
							valueGetter: (department: DepartmentInfo) => `${department.countUsers} чел.`,
						}),
						hasRights
							? new ColumnDef({
									field: 'status',
									headerName: 'Статус',
									type: 'statusCell',
									columnStyle: {
										display: 'flex',
										'justify-content': 'center',
									},
									width: 50,
									valueGetter: (department: DepartmentInfo) =>
										DepartmentStatus.getStatusColorByValue(department.isActive),
							  })
							: null,
					].filter(booleanGuard),
				};
			})
		);
	}

	public getFilterData$(): Observable<FilterDef[]> {
		const initialValue = this.initialQueryParams;
		return this.permission.checkPermission$(UserRights.AddEditRemoveDepartment).pipe(
			map((hasRights: boolean) => {
				return [
					{
						key: ClientQueryParam.Search,
						type: 'input',
						initialValue: initialValue[ClientQueryParam.Search],
						width: 300,
						params: new InputFilterParams({ placeholder: 'Поиск', icon: Icons.Search }),
					},
					hasRights && {
						key: ClientQueryParam.Status,
						type: 'select',
						initialValue: initialValue[ClientQueryParam.Status],
						width: 147,
						params: new SelectFilterParams({
							placeholder: 'Статус',
							options$: of(DepartmentStatus.getAllStatuses()),
							valueGetter: (s: IDepartmentStatus) => s.urlValue,
							displayValueGetter: (s: IDepartmentStatus) => s.label,
							icon: Icons.Status,
							iconColor: (s: IDepartmentStatus) => s.color,
							allowReset: true,
						}),
					},
				].filter(Boolean) as FilterDef[];
			})
		);
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
