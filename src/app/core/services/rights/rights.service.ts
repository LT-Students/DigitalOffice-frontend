import { Injectable } from '@angular/core';
import { RightsApiService } from '@api/rights-service/services/rights-api.service';
import { RoleApiService } from '@api/rights-service/services/role-api.service';
import { Observable } from 'rxjs';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { CreateRoleRequest } from '@api/rights-service/models/create-role-request';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { RoleInfo } from '@api/rights-service/models/role-info';
import { UserInfo } from '@api/rights-service/models/user-info';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';
import { RightInfo } from '@api/rights-service/models/right-info';
import { UUID } from '@app/types/uuid.type';

export interface IEditRoleStatusRequest {
	roleId: string;
	isActive: boolean;
}

export interface IAddRightsForUserRequest {
	userId: string;
	body: number[];
}

export type IRemoveRightsFromUserRequest = IAddRightsForUserRequest;

export interface IGetRoleRequest {
	roleId: string;
}

export interface IRoleResponse {
	role?: RoleInfo;
	users?: Array<UserInfo>;
}

@Injectable({
	providedIn: 'root',
})
export class RightsService {
	constructor(
		private _rightsService: RightsApiService,
		private _roleService: RoleApiService,
		private _responseMessage: ResponseMessageModel
	) {}

	//TODO create enum for locales
	public findRights(): Observable<OperationResultResponse<RightInfo[]>> {
		return this._rightsService.getRightsList({ locale: 'ru' });
	}

	public findRoles(params: IFindRequestEx): Observable<OperationResultResponse<RoleInfo[]>> {
		return this._roleService.findRoles({
			...params,
			locale: 'ru',
		});
	}

	public getRole(params: IGetRoleRequest): Observable<OperationResultResponse<IRoleResponse>> {
		return this._roleService.getRole(params);
	}

	public deleteRole(params: IEditRoleStatusRequest): Observable<OperationResultResponse<any>> {
		return this._roleService
			.editRoleStatus(params)
			.pipe(this._responseMessage.message(MessageTriggeredFrom.Rights, MessageMethod.Remove));
	}

	public restoreRole(params: IEditRoleStatusRequest): Observable<OperationResultResponse<any>> {
		return this._roleService
			.editRoleStatus(params)
			.pipe(this._responseMessage.message(MessageTriggeredFrom.Rights, MessageMethod.Restore));
	}

	public createRole(body: CreateRoleRequest): Observable<OperationResultResponse<any>> {
		return this._roleService
			.createRole({ body })
			.pipe(this._responseMessage.message(MessageTriggeredFrom.Rights, MessageMethod.Create));
	}

	public editRoleRightsSet(roleId: UUID, rights: number[]): Observable<OperationResultResponse<any>> {
		return this._roleService.editRoleRights({
			body: {
				roleId: roleId,
				rights: rights,
			},
		});
	}
}
