import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@data/api/company-service/models/operation-result-response';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { PositionApiService } from '@data/api/company-service/services/position-api.service';
import { IGetPositionRequest } from '@app/types/get-position-request.interface';
import { OperationResultResponsePositionInfo } from '@data/api/company-service/models/operation-result-response-position-info';
import { FindResultResponsePositionInfo } from '@data/api/company-service/models/find-result-response-position-info';
import { CreatePositionRequest } from '@data/api/company-service/models/create-position-request';
import { IEditPositionRequest } from '@app/types/edit-position-request.interface';

@Injectable({
	providedIn: 'root',
})
export class PositionService {
	constructor(private _positionService: PositionApiService) {}

	public addPosition(body: CreatePositionRequest): Observable<OperationResultResponse> {
		return this._positionService.addPosition({ body });
	}

	public getPosition(params: IGetPositionRequest): Observable<OperationResultResponsePositionInfo> {
		return this._positionService.getPosition(params);
	}

	public findPositions(params: IFindRequestEx): Observable<FindResultResponsePositionInfo> {
		return this._positionService.findPositions(params);
	}

	public editPosition(params: IEditPositionRequest): Observable<OperationResultResponse> {
		return this._positionService.editPosition(params);
	}
}
