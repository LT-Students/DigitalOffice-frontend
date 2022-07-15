import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunicationApiService } from '@api/user-service/services/communication-api.service';
import { CreateCommunicationRequest } from '@api/user-service/models/create-communication-request';
import { IEditCommunicationRequest } from '@app/types/edit-communication-request.interface';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';

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
	constructor(private communicationService: CommunicationApiService) {}

	public createCommunication(body: CreateCommunicationRequest): Observable<OperationResultResponse> {
		return this.communicationService.createCommunication({ body });
	}

	public editCommunication(params: IEditCommunicationRequest): Observable<OperationResultResponse> {
		return this.communicationService.editCommunication(params);
	}

	public removeCommunication(params: IRemoveCommunicationRequest): Observable<OperationResultResponse> {
		return this.communicationService.removeCommunication(params);
	}

	public resendConfirmation(communicationId: string): Observable<OperationResultResponse> {
		return this.communicationService.resendConfirmationCommunication({ communicationId });
	}
}
