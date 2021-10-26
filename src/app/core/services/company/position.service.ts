import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { PositionApiService } from '@data/api/company-service/services/position-api.service';
import { IGetPositionRequest } from '@app/types/get-position-request.interface';
import { CreatePositionRequest } from '@data/api/company-service/models/create-position-request';
import { IEditPositionRequest } from '@app/types/edit-position-request.interface';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';

export interface IPositionInfo {
	id?: string;
	name?: string;
	description?: string | null;
	isActive?: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class PositionService {
	constructor(private _positionService: PositionApiService) {}

	public addPosition(body: CreatePositionRequest): Observable<OperationResultResponse<{} | null>> {
		return this._positionService.addPosition({ body });
	}

	public getPosition(params: IGetPositionRequest): Observable<OperationResultResponse<IPositionInfo>> {
		return this._positionService.getPosition(params);
	}

	public findPositions(params: IFindRequestEx): Observable<OperationResultResponse<IPositionInfo[]>> {
		return this._positionService.findPositions(params);
	}

	public editPosition(params: IEditPositionRequest): Observable<OperationResultResponse<{} | null>> {
		return this._positionService.editPosition(params);
	}
}
