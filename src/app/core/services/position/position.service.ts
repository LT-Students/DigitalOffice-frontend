import { Injectable } from '@angular/core';
import { PositionApiService } from '@data/api/position-service/services/position-api.service';
import { UUID } from '@app/types/uuid.type';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { EditPositionRequest } from '@data/api/position-service/models/edit-position-request';
import { Observable, throwError } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { PositionInfo } from '@data/api/position-service/models/position-info';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

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
	constructor(private _positionApiService: PositionApiService, private _snackBar: MatSnackBar) {}

	public createPosition(body: ICreatePositionRequest): Observable<OperationResultResponse<{} | null>> {
		return this._positionApiService.createPosition({ body }).pipe(
			tap(() =>
				this._snackBar.open('Новая должность успешно добавлена', 'done', {
					duration: 3000,
				})
			),
			catchError((err) => {
				let errorMessage: string = err.error.errors?.[0] ?? 'Что-то пошло не так :(';
				if (err.status === 409) {
					errorMessage = 'Должность с таким названием уже существует';
				}
				this._snackBar.open(errorMessage, '×', { duration: 3000 });
				return throwError(err);
			})
		);
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
