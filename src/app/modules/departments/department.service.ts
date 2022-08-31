import { Injectable } from '@angular/core';
import { DepartmentApiService } from '@api/department-service/services/department-api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DepartmentInfo } from '@api/department-service/models/department-info';
import { FindResponse } from '@app/types/operation-result-response.interface';

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
}
