import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CommunicationApiService } from '@data/api/user-service/services/communication-api.service';
import { CreateCommunicationRequest } from '@data/api/user-service/models/create-communication-request';
import { IEditCommunicationRequest } from '@app/types/edit-communication-request.interface';
import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

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
			tap(() =>
				this._snackBar.open('Контакт успешно создан!', 'done', {
					duration: 3000,
				})
			),
			catchError((err) => {
				let errorMessage: string = err.error.errors?.[0] ?? 'Что-то пошло не так :(';
				if (err.status === 409) {
					errorMessage = 'Контакт с таким названием уже существует';
				}
				this._snackBar.open(errorMessage, '×', { duration: 3000 });
				return throwError(err);
			})
		);
	}

	public editCommunication(params: IEditCommunicationRequest): Observable<OperationResultResponse> {
		return this._communicationService.editCommunication(params).pipe(
			tap(() =>
				this._snackBar.open('Контакт успешно изменен!', 'done', {
					duration: 3000,
				})
			),
			catchError((err) => {
				let errorMessage: string = err.error.errors?.[0] ?? 'Что-то пошло не так :(';
				if (err.status === 409) {
					errorMessage = 'Вы ввели такое же значение';
				}
				this._snackBar.open(errorMessage, '×', { duration: 3000 });
				return throwError(err);
			})
		);
	}

	public removeCommunication(params: IRemoveCommunicationRequest): Observable<OperationResultResponse> {
		return this._communicationService.removeCommunication(params);
	}
}
