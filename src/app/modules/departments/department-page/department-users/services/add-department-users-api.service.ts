import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DepartmentUserApiService } from '@api/department-service/services/department-user-api.service';
import { UserInfo } from '@api/filter-service/models/user-info';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { FilterService } from '@app/services/filter/filter.service';
import { AddUsersApiBase } from '../../../../add-users-dialog/services/add-users-api.service';
import { NewDepartmentUser } from '../models/new-department-user';
import { DepartmentRoleInfo } from '../models/department-role-info';

@Injectable()
export class AddDepartmentUsersApiService extends AddUsersApiBase {
	constructor(filterService: FilterService, private departmentUsersApi: DepartmentUserApiService) {
		super(filterService);
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

	public loadUsers(name: string): Observable<NewDepartmentUser[]> {
		return super
			.findUsers(name)
			.pipe(map((users: UserInfo[]) => users.map((u: UserInfo) => new NewDepartmentUser(u))));
	}
}
