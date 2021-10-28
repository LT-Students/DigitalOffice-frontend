import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentApiService } from '@data/api/company-service/services/department-api.service';
import { CreateDepartmentRequest } from '@data/api/company-service/models/create-department-request';
import { IGetDepartmentRequest } from '@app/types/get-department-request.interface';
import { OperationResultResponseDepartmentInfo } from '@data/api/company-service/models/operation-result-response-department-info';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { FindResultResponseDepartmentInfo } from '@data/api/company-service/models/find-result-response-department-info';
import { IEditDepartmentRequest } from '@app/types/edit-department-request.interface';
import { DepartmentInfo } from '@data/api/company-service/models/department-info';
import { DepartmentUserInfo } from '@data/api/company-service/models/department-user-info';
import { ProjectInfo } from '@data/api/company-service/models/project-info';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';

export type EditDepartmentPath = '/name' | '/description' | '/isactive' | '/directorid';

export interface IGetDepartment {
	department?: DepartmentInfo;
	users?: Array<DepartmentUserInfo>;
	projects?: ProjectInfo;
}

@Injectable({
	providedIn: 'root',
})
export class DepartmentService {
	constructor(private _departmentService: DepartmentApiService) {}

	public addDepartment(body: CreateDepartmentRequest): Observable<OperationResultResponse<{} | null>> {
		return this._departmentService.addDepartment({ body });
	}

	public getDepartment(params: IGetDepartmentRequest): Observable<OperationResultResponse<IGetDepartment>> {
		return this._departmentService.getDepartment(params);
	}

	public findDepartments(params: IFindRequestEx): Observable<OperationResultResponse<DepartmentInfo[]>> {
		return this._departmentService.findDepartments(params);
	}

	public editDepartment(params: IEditDepartmentRequest): Observable<OperationResultResponse<{} | null>> {
		return this._departmentService.editDepartment(params);
	}
}
