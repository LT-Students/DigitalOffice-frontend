import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { OperationResultResponse } from '@data/api/company-service/models/operation-result-response';
import { OfficeApiService } from '@data/api/company-service/services/office-api.service';
import { CreateOfficeRequest } from '@data/api/company-service/models/create-office-request';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class OfficeService {
	constructor(private _officeService: OfficeApiService, private _snackBar: MatSnackBar) {}

	public createOffice(body: CreateOfficeRequest): Observable<OperationResultResponse> {
		return this._officeService.createOffice({ body }).pipe(
			tap(() =>
				this._snackBar.open('Новый офис успешно добавлен!', 'done', {
					duration: 3000,
				})
			),
			catchError((err) => {
				const errorMessage: string = err.error.errors[0] ?? 'Что-то пошло не так :(';
				this._snackBar.open(errorMessage, '×', { duration: 3000 });
				return throwError(err);
			})
		);
	}
}
