import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterUserApiService } from '@api/filter-service/services/filter-user-api.service';
import { DepartmentUserApiService } from '@api/department-service/services/department-user-api.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { UserInfo } from '@api/filter-service/models/user-info';
import { AddUsersApiBase } from '../../../../add-users-dialog/services/add-users-api.service';
import { NewDepartmentUser } from '../models/new-department-user';
import { DepartmentRoleInfo } from '../models/department-role-info';

@Injectable()
export class AddDepartmentUsersApiService extends AddUsersApiBase {
	constructor(private filterService: FilterUserApiService, private departmentUsersApi: DepartmentUserApiService) {
		super();
	}

	public addUsers(entityId: string, users: NewDepartmentUser[]): Observable<OperationResultResponse> {
		return this.departmentUsersApi.createDepartmentUser({
			body: {
				departmentId: entityId,
				users: users.map((u: NewDepartmentUser) => {
					const roleAndAssignment = DepartmentRoleInfo.getRoleAndAssignment(u.role);
					return {
						userId: u.id,
						...roleAndAssignment,
					};
				}),
			},
		});
	}

	public findUsers(name: string): Observable<NewDepartmentUser[]> {
		return this.filterService
			.filterUser({ skipCount: 0, takeCount: 50, fullnameincludesubstring: name })
			.pipe(
				map((res: OperationResultResponse<UserInfo[]>) =>
					(res.body || []).map((u: UserInfo) => new NewDepartmentUser(u))
				)
			);
	}
}
