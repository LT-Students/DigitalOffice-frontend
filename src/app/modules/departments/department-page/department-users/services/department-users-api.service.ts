import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DepartmentApiService } from '@api/department-service/services/department-api.service';
import { FindResponse, OperationResultResponse } from '@app/types/operation-result-response.interface';
import { MAX_INT32 } from '@app/utils/utils';
import { DepartmentUserApiService } from '@api/department-service/services/department-user-api.service';
import { DepartmentUserRole } from '@api/department-service/models/department-user-role';
import { DepartmentUserAssignment } from '@api/department-service/models/department-user-assignment';
import { DepartmentUser } from '../models/department-user';
import { DepartmentRole, DepartmentRoleInfo } from '../models/department-role-info';

export interface FindUsersParams {
	departmentUserRoleAscendingSort?: boolean;
	isAscendingSort?: boolean;
	byPositionId?: string;
	fullnameincludesubstring?: string;
}

@Injectable({
	providedIn: 'root',
})
export class DepartmentUsersApiService {
	constructor(private departmentUserApi: DepartmentUserApiService, private departmentApi: DepartmentApiService) {}

	public findUsers(departmentId: string, params: FindUsersParams): Observable<FindResponse<DepartmentUser>> {
		return this.departmentUserApi
			.findDepartmentUsers({
				departmentId,
				skipCount: 0,
				takeCount: MAX_INT32,
				isActive: true,
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

	/*
	 * employee -> manager = change role
	 * manager -> employee = change role
	 *
	 * employee -> DD = change assignment
	 * manager -> DD = change assignment
	 * DD -> employee = change assignment
	 *
	 * DD -> manager = change assignment, then change role
	 * */
	public changeUserRole(
		departmentId: string,
		userId: string,
		newRole: DepartmentRole,
		prevRole: DepartmentRole
	): Observable<OperationResultResponse> {
		const { assignment, role } = DepartmentRoleInfo.getRoleAndAssignment(newRole);
		if (newRole !== DepartmentRole.Director && prevRole !== DepartmentRole.Director) {
			return this.editRole(departmentId, userId, role);
		}
		if (newRole === DepartmentRole.Manager && prevRole === DepartmentRole.Director) {
			return this.editAssignment(departmentId, userId, assignment).pipe(
				switchMap(() => this.editRole(departmentId, userId, role))
			);
		}
		return this.editAssignment(departmentId, userId, assignment);
	}

	private editRole(
		departmentId: string,
		userId: string,
		role: DepartmentUserRole
	): Observable<OperationResultResponse> {
		return this.departmentApi.editDepartmentUserRole({
			departmentid: departmentId,
			body: {
				role,
				usersIds: [userId],
			},
		});
	}

	private editAssignment(
		departmentId: string,
		userId: string,
		assignment: DepartmentUserAssignment
	): Observable<OperationResultResponse> {
		return this.departmentApi.editDepartmentUserAssingment({
			departmentid: departmentId,
			body: { assignment, usersIds: [userId] },
		});
	}
}
