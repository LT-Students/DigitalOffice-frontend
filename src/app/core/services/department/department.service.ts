import { Injectable } from '@angular/core';
import { DepartmentApiService } from '@data/api/department-service/services/department-api.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { Observable } from 'rxjs';
import { UUID } from '@app/types/uuid.type';
import { DepartmentInfo } from '@data/api/department-service/models/department-info';
import { DepartmentUserInfo } from '@data/api/department-service/models/department-user-info';
import { ProjectInfo } from '@data/api/department-service/models/project-info';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { DepartmentUserRole } from '@data/api/department-service/models/department-user-role';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';
import { DepartmentPath, EditRequest } from '@app/types/edit-request';

export interface IGetDepartment {
	departmentid: string;
	includeusers?: boolean;
	includeprojects?: boolean;
}

export interface IDepartmentInfoEx {
	department?: DepartmentInfo;
	users?: Array<DepartmentUserInfo>;
	projects?: ProjectInfo;
}

export interface ICreateDepartmentRequest {
	description?: string;
	name: string;
	users?: Array<ICreateUserRequest>;
}

export interface ICreateUserRequest {
	role: DepartmentUserRole;
	userId: string;
}

@Injectable({
	providedIn: 'root',
})
export class DepartmentService {
	constructor(private _departmentApiService: DepartmentApiService, private _responseMessage: ResponseMessageModel) {}

	public createDepartment(body: ICreateDepartmentRequest): Observable<OperationResultResponse<{} | null>> {
		return this._departmentApiService
			.createDepartment({ body })
			.pipe(this._responseMessage.message(MessageTriggeredFrom.Department, MessageMethod.Create));
	}

	public getDepartment(params: IGetDepartment): Observable<OperationResultResponse<IDepartmentInfoEx>> {
		return this._departmentApiService.getDepartment(params);
	}

	public findDepartments(params: IFindRequestEx): Observable<OperationResultResponse<DepartmentInfo[]>> {
		return this._departmentApiService.findDepartments(params);
	}

	public editDepartment(
		departmentId: UUID,
		editRequest: EditRequest<DepartmentPath>
	): Observable<OperationResultResponse<{} | null>> {
		return this._editDepartment(departmentId, editRequest).pipe(
			this._responseMessage.message(MessageTriggeredFrom.Department, MessageMethod.Edit)
		);
	}

	public deleteDepartment(departmentId: UUID): Observable<OperationResultResponse<{} | null>> {
		return this._editDepartment(departmentId, [
			{
				op: 'replace',
				path: DepartmentPath.IS_ACTIVE,
				value: false,
			},
		]).pipe(this._responseMessage.message(MessageTriggeredFrom.Department, MessageMethod.Remove));
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

	private _editDepartment(
		departmentId: UUID,
		editRequest: EditRequest<DepartmentPath>
	): Observable<OperationResultResponse<{} | null>> {
		return this._departmentApiService.editDepartment({ departmentId: departmentId, body: editRequest });
	}
}
