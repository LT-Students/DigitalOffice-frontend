import { Injectable } from '@angular/core';
import { DepartmentApiService } from '@api/department-service/services/department-api.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { Observable } from 'rxjs';
import { UUID } from '@app/types/uuid.type';
import { DepartmentInfo } from '@api/department-service/models/department-info';
import { DepartmentUserInfo } from '@api/department-service/models/department-user-info';
import { ProjectInfo } from '@api/department-service/models/project-info';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { DepartmentUserRole } from '@api/department-service/models/department-user-role';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';
import { DepartmentPath, EditRequest } from '@app/types/edit-request';
import { NewsInfo } from '@api/department-service/models/news-info';

export interface IGetDepartment {
	departmentId: string;
	includeUsers?: boolean;
	includeProjects?: boolean;
	includeNews?: boolean;
}

export interface IDepartmentInfoEx {
	department?: DepartmentInfo;
	users?: Array<DepartmentUserInfo>;
	projects?: Array<ProjectInfo>;
	news?: Array<NewsInfo>;
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

	public restoreDepartment(departmentId: UUID): Observable<OperationResultResponse<{} | null>> {
		return this._editDepartment(departmentId, [
			{
				op: 'replace',
				path: DepartmentPath.IS_ACTIVE,
				value: true,
			},
		]).pipe(this._responseMessage.message(MessageTriggeredFrom.Department, MessageMethod.Restore));
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
