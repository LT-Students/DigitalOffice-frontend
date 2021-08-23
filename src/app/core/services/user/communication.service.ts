import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunicationApiService } from '@data/api/user-service/services/communication-api.service';
import { CreateCommunicationRequest } from '@data/api/user-service/models/create-communication-request';
import { IEditCommunicationRequest } from '@app/types/edit-communication-request.interface';
import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';

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
	constructor(private _communicationService: CommunicationApiService) {}

	public createCommunication(body: CreateCommunicationRequest): Observable<OperationResultResponse> {
		return this._communicationService.createCommunication({ body });
	}

	public editCommunication(params: IEditCommunicationRequest): Observable<OperationResultResponse> {
		return this._communicationService.editCommunication(params);
	}

	public removeCommunication(params: IRemoveCommunicationRequest): Observable<OperationResultResponse> {
		return this._communicationService.removeCommunication(params);
	}
}
