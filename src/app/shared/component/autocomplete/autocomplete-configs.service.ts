import { Injectable } from '@angular/core';
import { MAX_INT32 } from '@app/utils/utils';
import { map } from 'rxjs/operators';
import { DepartmentInfo } from '@api/department-service/models/department-info';
import { Observable } from 'rxjs';
import { DepartmentService } from '@app/services/department/department.service';

export interface AutocompleteConfig<T> {
	options$: Observable<T[]>;
	valueGetter: (o?: T) => any;
	displayWithFn: (o?: T) => string;
	filterFn: (filterValue: string, options: T[]) => T[];
}

@Injectable({
	providedIn: 'root',
})
export class AutocompleteConfigsService {
	constructor(private departmentService: DepartmentService) {}

	public getDepartmentsConfig(): AutocompleteConfig<DepartmentInfo> {
		return {
			options$: this.departmentService
				.findDepartments({ skipCount: 0, takeCount: MAX_INT32 })
				.pipe(map((res) => res.body as DepartmentInfo[])),
			valueGetter: (d?: DepartmentInfo) => d?.id || null,
			displayWithFn: (d?: DepartmentInfo) => d?.shortName || '',
			filterFn: (v: string, options: DepartmentInfo[]) => {
				v = v.toLowerCase();
				return options.filter(
					(d: DepartmentInfo) => d.shortName.toLowerCase().includes(v) || d.name.toLowerCase().includes(v)
				);
			},
		};
	}
}
