import { Injectable } from '@angular/core';
import { PositionApiService } from '@data/api/position-service/services/position-api.service';
import { UUID } from '@app/types/uuid.type';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { PositionInfo } from '@data/api/position-service/models/position-info';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';
import { EditRequest, PositionPath } from '@app/types/edit-request';

export interface ICreatePositionRequest {
	name: string;
	description?: null | string;
}

export interface IPositionInfo {
	id?: string;
	name?: string;
	description?: string;
	isActive?: boolean;
}

export interface IFindRequest {
	skipcount: number;
	takecount: number;
	includedeactivated?: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class PositionService {
	constructor(private _positionApiService: PositionApiService, private _responseMessage: ResponseMessageModel) {}

	public createPosition(body: ICreatePositionRequest): Observable<OperationResultResponse<{} | null>> {
		return this._positionApiService
			.createPosition({ body })
			.pipe(this._responseMessage.message(MessageTriggeredFrom.Position, MessageMethod.Create));
	}

	public getPosition(positionId: UUID): Observable<OperationResultResponse<IPositionInfo>> {
		return this._positionApiService.getPosition({ positionId: positionId });
	}

	//TODO merge PositionInfo and IPositionInfo into one interface
	public findPositions(params: IFindRequest): Observable<OperationResultResponse<PositionInfo[]>> {
		return this._positionApiService.findPositions(params);
	}

	public editPosition(
		positionId: UUID,
		params: EditRequest<PositionPath>
	): Observable<OperationResultResponse<{} | null>> {
		return this._editPosition(positionId, params).pipe(
			this._responseMessage.message(MessageTriggeredFrom.Position, MessageMethod.Edit)
		);
	}

	public deletePosition(positionId: UUID): Observable<OperationResultResponse<{} | null>> {
		return this._editPosition(positionId, [{ op: 'replace', path: PositionPath.IS_ACTIVE, value: false }]).pipe(
			this._responseMessage.message(MessageTriggeredFrom.Position, MessageMethod.Remove)
		);
	}

	public restorePosition(positionId: UUID): Observable<OperationResultResponse<{} | null>> {
		return this._editPosition(positionId, [{ op: 'replace', path: PositionPath.IS_ACTIVE, value: true }]).pipe(
			this._responseMessage.message(MessageTriggeredFrom.Position, MessageMethod.Restore)
		);
	}

	private _editPosition(
		positionId: UUID,
		params: EditRequest<PositionPath>
	): Observable<OperationResultResponse<{} | null>> {
		return this._positionApiService.editPosition({ positionId: positionId, body: params });
	}
}
