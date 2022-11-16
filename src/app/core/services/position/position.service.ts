import { Injectable } from '@angular/core';
import { PositionApiService } from '@api/position-service/services/position-api.service';
import { UUID } from '@app/types/uuid.type';
import { Observable } from 'rxjs';
import { FindResponse, OperationResultResponse } from '@app/types/operation-result-response.interface';
import { PositionInfo } from '@api/position-service/models/position-info';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';
import { EditRequest, PositionPath } from '@app/types/edit-request';
import { map } from 'rxjs/operators';

export interface ICreatePositionRequest {
	name: string;
	description?: string;
}

export interface IFindRequest {
	skipCount: number;
	takeCount: number;
	isascendingsort?: boolean;
	includeDeactivated: boolean;
	nameincludesubstring?: string;
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

	public findPositions({
		skipCount,
		takeCount,
		isascendingsort,
		nameincludesubstring,
		includeDeactivated,
	}: IFindRequest): Observable<FindResponse<PositionInfo>> {
		return this._positionApiService
			.findPositions({
				skipcount: skipCount,
				takecount: takeCount,
				isascendingsort,
				nameincludesubstring,
				includeDeactivated,
			})
			.pipe(map((res) => new FindResponse(res)));
	}

	public editPosition(
		positionId: UUID,
		params: EditRequest<PositionPath>
	): Observable<OperationResultResponse<{} | null>> {
		return this._editPosition(positionId, params).pipe(
			this._responseMessage.message(MessageTriggeredFrom.Position, MessageMethod.Edit)
		);
	}

	public deletePosition(positionId: UUID): Observable<OperationResultResponse> {
		return this._editPosition(positionId, [{ op: 'replace', path: PositionPath.IS_ACTIVE, value: false }]).pipe(
			this._responseMessage.message(MessageTriggeredFrom.Position, MessageMethod.Remove)
		);
	}

	public restorePosition(positionId: UUID): Observable<OperationResultResponse> {
		return this._editPosition(positionId, [{ op: 'replace', path: PositionPath.IS_ACTIVE, value: true }]).pipe(
			this._responseMessage.message(MessageTriggeredFrom.Position, MessageMethod.Restore)
		);
	}

	private _editPosition(positionId: UUID, params: EditRequest<PositionPath>): Observable<OperationResultResponse> {
		return this._positionApiService.editPosition({ positionId: positionId, body: params });
	}
}
