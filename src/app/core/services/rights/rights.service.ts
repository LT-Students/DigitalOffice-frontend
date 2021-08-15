//@ts-nocheck
import { Injectable } from '@angular/core';
import { RightsApiService } from '@data/api/rights-service/services/rights-api.service';
import { RoleApiService } from '@data/api/rights-service/services/role-api.service';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@data/api/rights-service/models/operation-result-response';
import { RightResponse } from '@data/api/rights-service/models/right-response';
import { IFindRequest } from '@app/types/find-request.interface';
import { RolesResponse } from '@data/api/rights-service/models/roles-response';
import { RoleResponse } from '@data/api/rights-service/models/role-response';
import { CreateRoleRequest } from '@data/api/rights-service/models/create-role-request';

export interface IAddRightsForUserRequest {
	/**
	 * User global unique identifier.
	 */
	userId: string;

	/**
	 * Right identifiers.
	 */
	rightIds: number[];
}

export interface IRemoveRightsFromUserRequest extends IAddRightsForUserRequest {}

export interface IGetRoleRequest {
	roleId: string;
}

@Injectable({
	providedIn: 'root'
})
export class RightsService {
	constructor(
		private _rightsService: RightsApiService,
		private _roleService: RoleApiService,
	) {
	}

	public addRightsForUser(params: IAddRightsForUserRequest): Observable<OperationResultResponse> {
		return this._rightsService.addRightsForUser(params);
	}

	public findRights(): Observable<RightResponse[]>  {
		return this._rightsService.getRightsList();
	}

	public removeRightsFromUser(params: IRemoveRightsFromUserRequest): Observable<void> {
		return this._rightsService.removeRightsFromUser(params);
	}

	public findRoles(params: IFindRequest): Observable<RolesResponse> {
		return this._roleService.findRoles(params);
	}

	public getRole(params: IGetRoleRequest): Observable<RoleResponse> {
		return this._roleService.getRole(params);
	}

	public createRole(body: CreateRoleRequest): Observable<OperationResultResponse> {
		return this._roleService.createRole({ body });
	}
}
