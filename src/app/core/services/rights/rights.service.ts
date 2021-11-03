import { Injectable } from '@angular/core';
import { RightsApiService } from '@data/api/rights-service/services/rights-api.service';
import { RoleApiService } from '@data/api/rights-service/services/role-api.service';
import { Observable, throwError } from 'rxjs';
import { IFindRequest } from '@app/types/find-request.interface';
import { CreateRoleRequest } from '@data/api/rights-service/models/create-role-request';
import { RightInfo } from '@data/api/rights-service/models/right-info';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { RoleInfo } from '@data/api/rights-service/models/role-info';
import { UserInfo } from '@data/api/rights-service/models/user-info';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IAddRightsForUserRequest {
	userId: string;
	rightIds: number[];
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
		private _snackBar: MatSnackBar
	) {}

	public addRightsForUser(params: IAddRightsForUserRequest): Observable<OperationResultResponse<any>> {
		return this._rightsService.addRightsForUser(params);
	}

	//TODO create enum for locales
	public findRights(): Observable<RightInfo[]> {
		return this._rightsService.getRightsList({ locale: 'ru' });
	}

	public removeRightsFromUser(params: IRemoveRightsFromUserRequest): Observable<void> {
		return this._rightsService.removeRightsFromUser(params);
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
			tap(() =>
				this._snackBar.open('Новая роль успешно добавлена!', 'done', {
					duration: 3000,
				})
			),
			catchError((err) => {
				let errorMessage: string = err.error.errors[0] ?? 'Что-то пошло не так :(';
				if (err.status === 409) {
					errorMessage = 'Проект с таким названием уже существует';
				}
				this._snackBar.open(errorMessage, '×', { duration: 3000 });
				return throwError(err);
			})
		);
	}
}
