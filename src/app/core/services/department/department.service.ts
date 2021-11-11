import { Injectable } from '@angular/core';
import { DepartmentApiService } from '@data/api/department-service/services/department-api.service';
import { EditDepartmentRequest } from '@data/api/department-service/models/edit-department-request';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { Observable, throwError } from 'rxjs';
import { UUID } from '@app/types/uuid.type';
import { DepartmentInfo } from '@data/api/department-service/models/department-info';
import { DepartmentUserInfo } from '@data/api/department-service/models/department-user-info';
import { ProjectInfo } from '@data/api/department-service/models/project-info';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
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
	constructor(private _departmentApiService: DepartmentApiService, private _snackBar: MatSnackBar) {}

	public createDepartment(body: ICreateDepartmentRequest): Observable<OperationResultResponse<{} | null>> {
		return this._departmentApiService.createDepartment({ body }).pipe(
			tap(() =>
				this._snackBar.open('Новый департамент успешно добавлен', 'done', {
					duration: 3000,
				})
			),
			catchError((err) => {
				let errorMessage: string = err.error.errors?.[0] ?? 'Что-то пошло не так :(';
				if (err.status === 409) {
					errorMessage = 'Департамент с таким названием уже существует';
				}
				this._snackBar.open(errorMessage, '×', { duration: 3000 });
				return throwError(err);
			})
		);
	}

	public getDepartment(params: IGetDepartment): Observable<OperationResultResponse<IDepartmentInfoEx>> {
		return this._departmentApiService.getDepartment(params);
	}

	public findDepartments(params: IFindRequestEx): Observable<OperationResultResponse<DepartmentInfo[]>> {
		return this._departmentApiService.findDepartments(params);
	}

	public editDepartment(params: IEditDepartment): Observable<OperationResultResponse<{} | null>> {
		return this._departmentApiService.editDepartment(params).pipe(
			tap(() =>
				this._snackBar.open('Департамент успешно изменен', 'done', {
					duration: 3000,
				})
			),
			catchError((err) => {
				const errorMessage: string = err.error.errors?.[0] ?? 'Что-то пошло не так :(';
				this._snackBar.open(errorMessage, '×', { duration: 3000 });
				return throwError(err);
			})
		);
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
