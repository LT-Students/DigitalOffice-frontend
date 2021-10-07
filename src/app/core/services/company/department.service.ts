import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@data/api/company-service/models/operation-result-response';
import { DepartmentApiService } from '@data/api/company-service/services/department-api.service';
import { CreateDepartmentRequest } from '@data/api/company-service/models/create-department-request';
import { IGetDepartmentRequest } from '@app/types/get-department-request.interface';
import { OperationResultResponseDepartmentInfo } from '@data/api/company-service/models/operation-result-response-department-info';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { FindResultResponseDepartmentInfo } from '@data/api/company-service/models/find-result-response-department-info';
import { IEditDepartmentRequest } from '@app/types/edit-department-request.interface';

export type EditDepartmentPath = '/name' | '/description' | '/isactive' | '/directorid';

@Injectable({
	providedIn: 'root',
})
export class DepartmentService {
	constructor(private _departmentService: DepartmentApiService) {}

	public addDepartment(body: CreateDepartmentRequest): Observable<OperationResultResponse> {
		return this._departmentService.addDepartment({ body });
	}

	public getDepartment(params: IGetDepartmentRequest): Observable<OperationResultResponseDepartmentInfo> {
		return this._departmentService.getDepartment(params);
	}

	public findDepartments(params: IFindRequestEx): Observable<FindResultResponseDepartmentInfo> {
		return this._departmentService.findDepartments(params);
	}

	public editDepartment(params: IEditDepartmentRequest): Observable<OperationResultResponse> {
		return this._departmentService.editDepartment(params);
	}
}
