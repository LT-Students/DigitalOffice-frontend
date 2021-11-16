import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export interface IErrorMessageTypes {
	triggered?: MessageTriggeredFrom;
	feminine: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class ResponseMessageModel {
	constructor(private _snackBar: MatSnackBar) {}

	private _responseMessageTypes: IErrorMessageTypes[] = [
		{ triggered: MessageTriggeredFrom.Project, feminine: false },
		{ triggered: MessageTriggeredFrom.Department, feminine: false },
		{ triggered: MessageTriggeredFrom.Office, feminine: false },
		{ triggered: MessageTriggeredFrom.Position, feminine: true },
		{ triggered: MessageTriggeredFrom.Rights, feminine: true },
		{ triggered: MessageTriggeredFrom.Communication, feminine: false },
		{ triggered: MessageTriggeredFrom.User, feminine: false },
		{ triggered: MessageTriggeredFrom.EmployeePage, feminine: true },
		{ triggered: MessageTriggeredFrom.News, feminine: true },
	];

	public getSuccessMessage(triggeredFrom: MessageTriggeredFrom, method: MessageMethod, success: any): string {
		const result = this._responseMessageTypes.find((item) => item.triggered === triggeredFrom);
		let successMessage = `${triggeredFrom} успешно ${method}${result?.feminine === true ? 'а' : ''}`;
		if (success.status === 'PartialSuccess') {
			successMessage = 'Выполнено частично';
		}
		return successMessage;
	}

	public showSuccessMessage(triggeredFrom: MessageTriggeredFrom, method: MessageMethod, success: any): void {
		const result = this._responseMessageTypes.find((item) => item.triggered === triggeredFrom);
		let successMessage = `${triggeredFrom} успешно ${method}${result?.feminine === true ? 'а' : ''}`;
		if (success.status === 'PartialSuccess') {
			successMessage = 'Выполнено частично';
		}
		this._snackBar.open(successMessage, '×', {
			duration: 3000,
		});
	}

	public getErrorMessage(err: any): string {
		let errorMessage: string = err.error.errors?.join(' ') ?? 'Что-то пошло не так :(';
		if (err.status === 403) {
			errorMessage = 'Недостаточно прав доступа';
		}
		if (err.status === 404) {
			errorMessage = 'Операция отклонена';
		}
		return errorMessage;
	}

	public showErrorMessage(err: any): void {
		let errorMessage: string = err.error.errors?.join(' ') ?? 'Что-то пошло не так :(';
		if (err.status === 403) {
			errorMessage = 'Недостаточно прав доступа';
		} else if (err.status === 404) {
			errorMessage = 'Операция отклонена';
		}
		this._snackBar.open(errorMessage, '×', {
			duration: 3000,
		});
	}

	public message(triggeredFrom: MessageTriggeredFrom, method: MessageMethod) {
		return (source: Observable<any>) => {
			return source.pipe(
				catchError((err) => {
					this.showErrorMessage(err);
					return throwError(err);
				}),
				tap((result) => {
					this.showSuccessMessage(triggeredFrom, method, result);
				})
			);
		};
	}
}
