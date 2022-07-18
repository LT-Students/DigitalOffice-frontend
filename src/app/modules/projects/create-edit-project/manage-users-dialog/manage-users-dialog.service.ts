import { Injectable } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { DepartmentInfo } from '@api/department-service/models/department-info';
import { DepartmentService } from '@app/services/department/department.service';
import { UserInfo } from '@api/filter-service/models/user-info';
import { FilterService } from '@app/services/filter/filter.service';
import { map } from 'rxjs/operators';
import { ColumnDef } from '../../../table/models';
import { AutocompleteFilterParams, FilterDef, InputFilterParams } from '../../../dynamic-filter/models';
import { SimpleDataSource } from '../../../table/table.component';

@Injectable({
	providedIn: 'root',
})
export class ManageUsersDialogService {
	constructor(private filterService: FilterService, private departmentService: DepartmentService) {}

	public loadUsers$() {
		return new SimpleDataSource(
			this.filterService.filterUsers({ skipCount: 0, takeCount: 20 }).pipe(map((res) => res.body as UserInfo[]))
		);
	}

	public getFilterData(): FilterDef[] {
		return [
			{
				key: 'nameincludesubstring',
				type: 'input',
				width: 267,
				params: new InputFilterParams({ icon: Icons.Search, placeholder: 'Поиск по фамилии и имени' }),
			},
			{
				key: 'department',
				type: 'autocomplete',
				width: 194,
				params: new AutocompleteFilterParams({
					placeholder: 'Департамент',
					loadOptions$: this.departmentService.findDepartments.bind(this.departmentService),
					valueGetter: (d: DepartmentInfo | null) => d?.id,
					displayValueGetter: (d: DepartmentInfo) => d.shortName,
					displayWithFn: (d: DepartmentInfo | null) => d?.shortName || '',
				}),
			},
		];
	}

	public getTableColumns(): ColumnDef[] {
		return [
			{
				type: 'checkboxCell',
				field: 'checkbox',
				width: 20,
			},
			{
				type: 'userInfoCell',
				field: 'user',
				valueGetter: (user: UserInfo) => user,
			},
			{
				type: 'textCell',
				field: 'department',
				valueGetter: (user: UserInfo) => user.department?.name,
			},
			{
				type: 'iconButtonCell',
				field: 'add-remove',
				params: {
					icon: (user: UserInfo) => Icons.Delete,
					onClickFn: () => {},
				},
			},
		];
	}
}
