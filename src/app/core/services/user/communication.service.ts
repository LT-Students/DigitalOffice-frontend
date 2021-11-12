import { Injectable } from '@angular/core';
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
	constructor(private _communicationService: CommunicationApiService, private _snackBar: MatSnackBar) {}

	public createCommunication(body: CreateCommunicationRequest): Observable<OperationResultResponse> {
		return this._communicationService.createCommunication({ body }).pipe(
			catchError((err) => {
				this._snackBar.open(ResponseMessageModel.getErrorMessage(err), '×', { duration: 3000 });
				return throwError(err);
			}),
			tap(() => {
				this._snackBar.open(
					ResponseMessageModel.getSuccessMessage(MessageTriggeredFrom.Communication, MessageMethod.Create),
					'done',
					{
						duration: 3000,
					}
				);
			})
		);
	}

	public editCommunication(params: IEditCommunicationRequest): Observable<OperationResultResponse> {
		return this._communicationService.editCommunication(params).pipe(
			catchError((err) => {
				this._snackBar.open(ResponseMessageModel.getErrorMessage(err), '×', { duration: 3000 });
				return throwError(err);
			}),
			tap(() => {
				this._snackBar.open(
					ResponseMessageModel.getSuccessMessage(MessageTriggeredFrom.Communication, MessageMethod.Edit),
					'done',
					{
						duration: 3000,
					}
				);
			})
		);
	}

	public removeCommunication(params: IRemoveCommunicationRequest): Observable<OperationResultResponse> {
		return this._communicationService.removeCommunication(params);
	}
}
