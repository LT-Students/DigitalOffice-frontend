import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunicationApiService } from '@api/user-service/services/communication-api.service';
import { CreateCommunicationRequest } from '@api/user-service/models/create-communication-request';
import { IEditCommunicationRequest } from '@app/types/edit-communication-request.interface';
import { OperationResultResponse } from '@api/user-service/models/operation-result-response';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageTriggeredFrom, MessageMethod } from '@app/models/response/response-message';

export interface IRemoveCommunicationRequest {
	/**
	 * Specific communication id
	 */
	communicationId: string;
}

@Injectable({
	providedIn: 'root',
})
export class CommunicationService {
	constructor(
		private _communicationService: CommunicationApiService,
		private _responseMessage: ResponseMessageModel
	) {}

	public createCommunication(body: CreateCommunicationRequest): Observable<OperationResultResponse> {
		return this._communicationService
			.createCommunication({ body })
			.pipe(this._responseMessage.message(MessageTriggeredFrom.Communication, MessageMethod.Create));
	}

	public editCommunication(params: IEditCommunicationRequest): Observable<OperationResultResponse> {
		return this._communicationService
			.editCommunication(params)
			.pipe(this._responseMessage.message(MessageTriggeredFrom.Communication, MessageMethod.Edit));
	}

	public removeCommunication(params: IRemoveCommunicationRequest): Observable<OperationResultResponse> {
		return this._communicationService.removeCommunication(params);
	}
}
