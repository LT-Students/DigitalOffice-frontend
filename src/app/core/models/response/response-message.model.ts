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
		{ triggered: MessageTriggeredFrom.WorkTime, feminine: true },
	];

	public getSuccessMessage(triggeredFrom: MessageTriggeredFrom, method: MessageMethod, status: string): string {
		if (status === 'PartialSuccess') {
			return 'Выполнено частично';
		}
		const result = this._responseMessageTypes.find((item) => item.triggered === triggeredFrom);
		return `${triggeredFrom} успешно ${method}${result?.feminine === true ? 'а' : ''}`;
	}

	public getErrorMessage(err: any): string {
		if (err.status === 403) {
			return 'Недостаточно прав доступа';
		}
		if (err.status === 404) {
			return 'Операция отклонена';
		}
		return err.error.errors?.join(' ') ?? 'Что-то пошло не так :(';
	}

	public message(
		triggeredFrom: MessageTriggeredFrom,
		method: MessageMethod
	): (source: Observable<any>) => Observable<any> {
		return (source) => {
			return source.pipe(
				catchError((err) => {
					this._snackBar.open(this.getErrorMessage(err), '×', {
						duration: 3000,
					});
					return throwError(err);
				}),
				tap((result) => {
					this._snackBar.open(this.getSuccessMessage(triggeredFrom, method, result.status), '×', {
						duration: 3000,
					});
				})
			);
		};
	}
}
