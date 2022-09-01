import { Injectable } from '@angular/core';
import { DepartmentApiService } from '@api/department-service/services/department-api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DepartmentInfo } from '@api/department-service/models/department-info';
import { FindResponse } from '@app/types/operation-result-response.interface';
import { DepartmentResponse } from '@api/department-service/models/department-response';
import { Department } from './department-page/department';

export interface FindDepartmentsParams {
	skipCount: number;
	takeCount: number;
	isAscendingSort: boolean;
	isActive?: boolean;
	nameIncludeSubstring?: string;
}

@Injectable({
	providedIn: 'root',
})
export class DepartmentService {
	constructor(private departmentApi: DepartmentApiService) {}

	public findDepartments(params: FindDepartmentsParams): Observable<FindResponse<DepartmentInfo>> {
		return this.departmentApi.findDepartments(params).pipe(map((res) => new FindResponse(res)));
	}

	public getDepartment(departmentId: string): Observable<Department> {
		return this.departmentApi
			.getDepartment({ departmentId, includeUsers: true, includeCategory: false })
			.pipe(map((res) => new Department(res.body as DepartmentResponse)));
	}

	public createDepartment(name: string, shortName: string, description?: string): Observable<string> {
		return this.departmentApi
			.createDepartment({ body: { name, shortName, description, users: [] } })
			.pipe(map((res) => res.body as string));
	}
}
