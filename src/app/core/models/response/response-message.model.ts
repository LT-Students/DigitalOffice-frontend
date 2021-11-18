import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';

export interface IErrorMessageTypes {
	triggered?: MessageTriggeredFrom;
	feminine: boolean;
}

export class ResponseMessageModel {
	private static _errorMessageTypes: IErrorMessageTypes[] = [
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

	public static getSuccessMessage(triggeredFrom: MessageTriggeredFrom, method: MessageMethod) {
		let result = this._errorMessageTypes.find((item) => item.triggered === triggeredFrom);
		return `${triggeredFrom} успешно ${method}${result?.feminine === true ? 'а' : ''}`;
	}

	public static getErrorMessage(err: any) {
		let errorMessage: string = err.error.errors?.[0] ?? 'Что-то пошло не так :(';
		if (err.status === 403) {
			errorMessage = 'Недостаточно прав доступа';
		}
		if (err.status === 404) {
			errorMessage = 'Операция отклонена';
		}
		return errorMessage;
	}
}
