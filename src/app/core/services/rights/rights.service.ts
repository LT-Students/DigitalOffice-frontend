import { Injectable } from '@angular/core';
import { RightsApiService } from '@data/api/rights-service/services/rights-api.service';
import { RoleApiService } from '@data/api/rights-service/services/role-api.service';
import { Observable, throwError } from 'rxjs';
import { IFindRequest } from '@app/types/find-request.interface';
import { CreateRoleRequest } from '@data/api/rights-service/models/create-role-request';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { RoleInfo } from '@data/api/rights-service/models/role-info';
import { UserInfo } from '@data/api/rights-service/models/user-info';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRightsApiService } from '@data/api/rights-service/services/user-rights-api.service';
import { OperationResultResponseRights } from '@data/api/rights-service/models/operation-result-response-rights';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';

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
		private _userRightsService: UserRightsApiService,
		private _snackBar: MatSnackBar
	) {}

	public addRightsForUser(params: IAddRightsForUserRequest): Observable<OperationResultResponse<any>> {
		return this._userRightsService.create(params);
	}

	//TODO create enum for locales
	public findRights(): Observable<OperationResultResponseRights> {
		return this._rightsService.getRightsList({ locale: 'ru' });
	}

	public removeRightsFromUser(params: IRemoveRightsFromUserRequest): Observable<OperationResultResponse<any>> {
		return this._userRightsService.removeRightsFromUser(params);
	}

	public findRoles(params: IFindRequest): Observable<OperationResultResponse<RoleInfo[]>> {
		return this._roleService.findRoles({
			...params,
			locale: 'ru',
		});
	}

	public getRole(params: IGetRoleRequest): Observable<OperationResultResponse<IRoleResponse>> {
		return this._roleService.getRole(params);
	}

	public createRole(body: CreateRoleRequest): Observable<OperationResultResponse<any>> {
		return this._roleService.createRole({ body }).pipe(
			catchError((err) => {
				this._snackBar.open(ResponseMessageModel.getErrorMessage(err), '×', { duration: 3000 });
				return throwError(err);
			}),
			tap(() => {
				this._snackBar.open(
					ResponseMessageModel.getSuccessMessage(MessageTriggeredFrom.Rights, MessageMethod.Create),
					'done',
					{
						duration: 3000,
					}
				);
			})
		);
	}
}
