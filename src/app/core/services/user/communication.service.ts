import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CommunicationApiService } from '@data/api/user-service/services/communication-api.service';
import { CreateCommunicationRequest } from '@data/api/user-service/models/create-communication-request';
import { IEditCommunicationRequest } from '@app/types/edit-communication-request.interface';
import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
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
		private _snackBar: MatSnackBar,
		private _responseMessage: ResponseMessageModel
	) {}

	public createCommunication(body: CreateCommunicationRequest): Observable<OperationResultResponse> {
		return this._communicationService.createCommunication({ body }).pipe(
			catchError((err) => {
				this._responseMessage.showErrorMessage(err);
				return throwError(err);
			}),
			tap(() => {
				this._responseMessage.showSuccessMessage(MessageTriggeredFrom.Communication, MessageMethod.Create);
			})
		);
	}

	public editCommunication(params: IEditCommunicationRequest): Observable<OperationResultResponse> {
		return this._communicationService.editCommunication(params).pipe(
			catchError((err) => {
				this._responseMessage.showErrorMessage(err);
				return throwError(err);
			}),
			tap(() => {
				console.log('hf,jnt!');
				this._responseMessage.showSuccessMessage(MessageTriggeredFrom.Communication, MessageMethod.Edit);
			})
		);
	}

	public removeCommunication(params: IRemoveCommunicationRequest): Observable<OperationResultResponse> {
		return this._communicationService.removeCommunication(params);
	}
}
