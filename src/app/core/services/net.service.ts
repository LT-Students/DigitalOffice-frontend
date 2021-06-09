import { Injectable } from '@angular/core';
import { PositionApiService } from '@data/api/company-service/services/position-api.service';
import { Observable, of } from 'rxjs';
import { PositionResponse } from '@data/api/company-service/models/position-response';
import { switchMap } from 'rxjs/operators';
import { DepartmentApiService } from '@data/api/company-service/services/department-api.service';
import { Department } from '@data/api/company-service/models/department';

@Injectable()
export class NetService {
	constructor(
		private _positionApiService: PositionApiService,
		private _departmentApiService: DepartmentApiService
	) {}

	private _mockPositions: PositionResponse[] = [
		{ info: { name: 'Junior Pug' } },
		{ info: { name: 'Boss Pug' } },
	];

	public getPositionsList(): Observable<PositionResponse[]> {
		return this._positionApiService.getPositionsList().pipe(
			switchMap((res: PositionResponse[]) => {
				return (res && res.length) ? of(res) : of(this._mockPositions);
			})
		);
	}

	public getDepartmentsList(): Observable<Department> {
		return this._departmentApiService.get({ departmentId: '123' });
	}


}
