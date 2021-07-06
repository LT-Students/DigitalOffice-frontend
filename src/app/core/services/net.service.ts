import { Injectable } from '@angular/core';
import { PositionApiService } from '@data/api/company-service/services/position-api.service';
import { Observable, of, throwError } from 'rxjs';
import { PositionResponse } from '@data/api/company-service/models/position-response';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { DepartmentApiService } from '@data/api/company-service/services/department-api.service';
import { DepartmentsResponse } from '@data/api/company-service/models/departments-response';
import { DepartmentInfo } from '@data/api/user-service/models/department-info';
import { PositionInfo } from '@data/api/user-service/models/position-info';
import { CredentialsApiService } from '@data/api/user-service/services/credentials-api.service';

@Injectable()
export class NetService {
	constructor(
		private _positionApiService: PositionApiService,
		private _departmentApiService: DepartmentApiService,
		private _credentialsApiService: CredentialsApiService
	) {}

	private _mockPositions: PositionInfo[] = [
		{ id: 'id', name: 'Junior Pug' },
		{ id: 'id1', name: 'Boss Pug' },
	];

	public getPositionsList(): Observable<PositionInfo[]> {
		return this._positionApiService.findPositions().pipe(
			switchMap((res: PositionResponse[]) => {
				return res && res.length ? of(res.map((position) => position.info)) : of(this._mockPositions);
			})
		);
	}

	public getDepartmentsList(): Observable<DepartmentInfo[]> {
		return this._departmentApiService.findDepartments().pipe(
			switchMap((res: DepartmentsResponse) => of(res.departments)),
			catchError((error) => {
				return throwError(error);
			})
		);
	}

	public generatePassword(): Observable<string> {
		return this._credentialsApiService.generatePassword();
	}
}
