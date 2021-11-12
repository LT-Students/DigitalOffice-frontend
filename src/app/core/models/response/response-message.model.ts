import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IErrorMessageTypes {
	triggered?: MessageTriggeredFrom;
	feminine: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class ResponseMessageModel {
	constructor(private _snackBar: MatSnackBar) {}

	private _errorMessageTypes: IErrorMessageTypes[] = [
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

	public getSuccessMessage(triggeredFrom: MessageTriggeredFrom, method: MessageMethod): string {
		const result = this._errorMessageTypes.find((item) => item.triggered === triggeredFrom);
		return `${triggeredFrom} успешно ${method}${result?.feminine === true ? 'а' : ''}`;
	}

	public showSuccessMessage(triggeredFrom: MessageTriggeredFrom, method: MessageMethod): void {
		const result = this._errorMessageTypes.find((item) => item.triggered === triggeredFrom);
		this._snackBar.open(`${triggeredFrom} успешно ${method}${result?.feminine === true ? 'а' : ''}`, 'done', {
			duration: 3000,
		});
	}

	public getErrorMessage(err: any): string {
		let errorMessage: string = err.error.errors?.[0] ?? 'Что-то пошло не так :(';
		if (err.status === 403) {
			errorMessage = 'Недостаточно прав доступа';
		}
		if (err.status === 404) {
			errorMessage = 'Операция отклонена';
		}
		return errorMessage;
	}

	public showErrorMessage(err: any): void {
		let errorMessage: string = err.error.errors?.[0] ?? 'Что-то пошло не так :(';
		if (err.status === 403) {
			errorMessage = 'Недостаточно прав доступа';
		} else if (err.status === 404) {
			errorMessage = 'Операция отклонена';
		}
		this._snackBar.open(errorMessage, '', {
			duration: 3000,
		});
	}
}
