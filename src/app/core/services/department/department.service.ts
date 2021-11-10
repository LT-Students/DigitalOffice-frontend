import { Injectable } from '@angular/core';
import { DepartmentApiService } from '@data/api/department-service/services/department-api.service';
import { EditDepartmentRequest } from '@data/api/department-service/models/edit-department-request';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { Observable } from 'rxjs';
import { UUID } from '@app/types/uuid.type';
import { DepartmentInfo } from '@data/api/department-service/models/department-info';
import { DepartmentUserInfo } from '@data/api/department-service/models/department-user-info';
import { ProjectInfo } from '@data/api/department-service/models/project-info';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { DepartmentUserRole } from '@data/api/department-service/models/department-user-role';

export interface IGetDepartment {
	departmentid: string;
	includeusers?: boolean;
	includeprojects?: boolean;
}

export interface IEditDepartment {
	departmentId: string;
	body?: EditDepartmentRequest;
}

export interface DepartmentInfoEx {
	department?: DepartmentInfo;
	users?: Array<DepartmentUserInfo>;
	projects?: ProjectInfo;
}

export interface ICreateDepartmentRequest {
	description?: null | string;
	name: string;
	users?: Array<ICreateUserRequest>;
}

export interface ICreateUserRequest {
	role?: DepartmentUserRole;
	userId?: string;
}

@Injectable({
	providedIn: 'root',
})
export class DepartmentService {
	constructor(private _departmentApiService: DepartmentApiService) {}

	public createDepartment(body: ICreateDepartmentRequest): Observable<OperationResultResponse<{} | null>> {
		return this._departmentApiService.createDepartment({ body });
	}

	public getDepartment(params: IGetDepartment): Observable<OperationResultResponse<DepartmentInfoEx>> {
		return this._departmentApiService.getDepartment(params);
	}

	public findDepartments(params: IFindRequestEx): Observable<OperationResultResponse<DepartmentInfo[]>> {
		return this._departmentApiService.findDepartments(params);
	}

	public editDepartment(params: IEditDepartment): Observable<OperationResultResponse<{} | null>> {
		return this._departmentApiService.editDepartment(params);
	}

	public addUsersToDepartment(departmentId: UUID, userIds: UUID[]): Observable<OperationResultResponse<{} | null>> {
		return this._departmentApiService.addDepartmentUsers({
			departmentid: departmentId,
			body: [...userIds],
		});
	}

	public removeUsersFromDepartment(
		departmentId: UUID,
		userIds: UUID[]
	): Observable<OperationResultResponse<{} | null>> {
		return this._departmentApiService.removeUsers({
			departmentid: departmentId,
			body: userIds,
		});
	}
}
