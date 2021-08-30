//@ts-nocheck
import { Injectable } from '@angular/core';
import { PositionApiService } from '@data/api/company-service/services/position-api.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { DepartmentApiService } from '@data/api/company-service/services/department-api.service';
import { PositionInfo } from '@data/api/user-service/models/position-info';
import { CredentialsApiService } from '@data/api/user-service/services/credentials-api.service';
import { CompanyApiService } from '@data/api/company-service/services/company-api.service';
import { OperationResultResponseDepartmentInfo } from '@data/api/company-service/models/operation-result-response-department-info';
import { FindResultResponseDepartmentInfo } from '@data/api/company-service/models/find-result-response-department-info';
import { FindResultResponseOfficeInfo } from '@data/api/company-service/models/find-result-response-office-info';
import { FindResultResponsePositionInfo } from '@data/api/company-service/models/find-result-response-position-info';
import { IFindRequestEx } from '@app/types/find-request.interface';

@Injectable()
export class NetService {
	constructor(
		private _positionApiService: PositionApiService,
		private _departmentApiService: DepartmentApiService,
		private _credentialsApiService: CredentialsApiService,
		private _companyApiService: CompanyApiService
	) {}

	private _mockPositions: PositionInfo[] = [
		{ id: 'id', name: 'Junior Pug' },
		{ id: 'id1', name: 'Boss Pug' },
	];

	public getPositionsList(params: {
		skipCount: number;
		takeCount: number;
		includeDeactivated?: boolean;
	}): Observable<FindResultResponsePositionInfo> {
		return this._positionApiService.findPositions(params);
	}

	public getDepartmentsList(params: {
		skipCount: number;
		takeCount: number;
		includeDeactivated?: boolean;
	}): Observable<FindResultResponseDepartmentInfo> {
		return this._departmentApiService.findDepartments(params).pipe(
			catchError((error) => {
				return throwError(error);
			})
		);
	}

	public getOfficesList(params: IFindRequestEx): Observable<FindResultResponseOfficeInfo> {
		return this._companyApiService.findOffices(params);
	}

	public getDepartment(params: {
		departmentid: string;
		includeusers?: boolean;
		includeprojects?: boolean;
	}): Observable<OperationResultResponseDepartmentInfo> {
		return this._departmentApiService.getDepartment(params);
	}

	public generatePassword(): Observable<string> {
		return this._credentialsApiService.generatePassword();
	}
}
