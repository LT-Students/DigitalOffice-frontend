import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AlertService } from '@app/services/alert.service';

export interface IErrorMessageTypes {
	triggered?: MessageTriggeredFrom;
	feminine: boolean;
	neuter: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class ResponseMessageModel {
	constructor(private alert: AlertService) {}

	private _responseMessageTypes: IErrorMessageTypes[] = [
		{ triggered: MessageTriggeredFrom.Project, feminine: false, neuter: false },
		{ triggered: MessageTriggeredFrom.Department, feminine: false, neuter: false },
		{ triggered: MessageTriggeredFrom.Office, feminine: false, neuter: false },
		{ triggered: MessageTriggeredFrom.Position, feminine: true, neuter: false },
		{ triggered: MessageTriggeredFrom.Rights, feminine: true, neuter: false },
		{ triggered: MessageTriggeredFrom.Communication, feminine: false, neuter: false },
		{ triggered: MessageTriggeredFrom.User, feminine: false, neuter: false },
		{ triggered: MessageTriggeredFrom.EmployeePage, feminine: true, neuter: false },
		{ triggered: MessageTriggeredFrom.News, feminine: true, neuter: false },
		{ triggered: MessageTriggeredFrom.WorkTime, feminine: true, neuter: false },
		{ triggered: MessageTriggeredFrom.Password, feminine: false, neuter: false },
		{ triggered: MessageTriggeredFrom.LeaveTime, feminine: false, neuter: true },
	];

	public getSuccessMessage(triggeredFrom: MessageTriggeredFrom, method: MessageMethod, status: string): string {
		if (status === 'PartialSuccess') {
			return 'Выполнено частично';
		}
		const result = this._responseMessageTypes.find((item) => item.triggered === triggeredFrom);
		return `${triggeredFrom} успешно ${method}${
			result?.feminine === true ? 'а' : result?.neuter === true ? 'о' : ''
		}`;
	}

	public message(
		triggeredFrom: MessageTriggeredFrom,
		method: MessageMethod
	): (source: Observable<any>) => Observable<any> {
		return (source) => {
			return source.pipe(
				tap((result) => {
					this.alert.open(this.getSuccessMessage(triggeredFrom, method, result.status));
				})
			);
		};
	}
}
