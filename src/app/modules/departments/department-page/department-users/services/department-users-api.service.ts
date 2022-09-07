import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FindResponse } from '@app/types/operation-result-response.interface';
import { MAX_INT32 } from '@app/utils/utils';
import { DepartmentUserApiService } from '@api/department-service/services/department-user-api.service';
import { DepartmentUser } from '../models/department-user';

interface FindUsersParams {
	departmentUserRoleAscendingSort: boolean;
	isAscendingSort: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class DepartmentUsersApiService {
	constructor(private departmentUserApi: DepartmentUserApiService) {}

	public findUsers(departmentId: string, params: FindUsersParams): Observable<FindResponse<DepartmentUser>> {
		return this.departmentUserApi
			.findDepartmentUsers({
				departmentId,
				skipCount: 0,
				takeCount: MAX_INT32,
				isActive: true,
				includeAvatars: true,
				includePositions: true,
				...params,
			})
			.pipe(
				map((res) => {
					const response = {
						...res,
						body: (res.body || []).map((u) => new DepartmentUser(u)),
					};
					return new FindResponse(response);
				})
			);
	}
}
