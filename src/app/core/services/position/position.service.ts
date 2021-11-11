import { Injectable } from '@angular/core';
import { PositionApiService } from '@data/api/position-service/services/position-api.service';
import { UUID } from '@app/types/uuid.type';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { EditPositionRequest } from '@data/api/position-service/models/edit-position-request';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { PositionInfo } from '@data/api/position-service/models/position-info';

export interface ICreatePositionRequest {
	name: string;
	description?: null | string;
}

export interface IEditPosition {
	positionId: string;
	body?: EditPositionRequest;
}

export interface IPositionInfo {
	id?: string;
	name?: string;
	description?: string;
	isactive?: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class PositionService {
	constructor(private _positionApiService: PositionApiService) {}

	public createPosition(body: ICreatePositionRequest): Observable<OperationResultResponse<{} | null>> {
		return this._positionApiService.createPosition({ body });
	}

	public getPosition(positionId: UUID): Observable<OperationResultResponse<IPositionInfo>> {
		return this._positionApiService.getPosition({ positionId: positionId });
	}

	//TODO merge PositionInfo and IPositionInfo into one interface
	public findPositions(params: IFindRequestEx): Observable<OperationResultResponse<PositionInfo[]>> {
		return this._positionApiService.findPositions(params);
	}

	public editPosition(params: IEditPosition): Observable<OperationResultResponse<{} | null>> {
		return this._positionApiService.editPosition(params);
	}
}
