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
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';

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
			catchError((err) => {
				this._snackBar.open(ResponseMessageModel.getErrorMessage(err), '×', { duration: 3000 });
				return throwError(err);
			}),
			tap(() => {
				this._snackBar.open(
					ResponseMessageModel.getSuccessMessage(MessageTriggeredFrom.Position, MessageMethod.Create),
					'done',
					{
						duration: 3000,
					}
				);
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
