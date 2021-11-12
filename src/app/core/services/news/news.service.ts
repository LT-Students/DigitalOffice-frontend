import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { NewsApiService } from '@data/api/news-service/services/news-api.service';
import { CreateNewsRequest } from '@data/api/news-service/models/create-news-request';
import { EditNewsRequest } from '@data/api/news-service/models/edit-news-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { NewsPatchOperation } from '@data/api/news-service/models/news-patch-operation';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { NewsInfo } from '@data/api/news-service/models/news-info';
import { User } from '@data/api/news-service/models/user';
import { Department } from '@data/api/news-service/models/department';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';

export interface IFindNewsRequest {
	skipCount: number;
	takeCount: number;
	authorId?: string;
	departmentId?: string;
	includeDeactivated?: boolean;
}

interface IGetNewsResponse {
	id?: string;
	preview?: string;
	content?: string;
	subject?: string;
	pseudonym?: string;
	author?: User;
	department?: Department;
	isactive?: boolean;
	createdAtUtc?: string;
	sender?: User;
}

@Injectable()
export class NewsService {
	constructor(
		private _newsService: NewsApiService,
		@Inject(ResponseMessageModel) private _responseMessage: ResponseMessageModel
	) {}

	public createNews(body: CreateNewsRequest): Observable<OperationResultResponse<{}>> {
		return this._newsService.createNews({ body }).pipe(
			catchError((err) => {
				this._responseMessage.showErrorMessage(err);
				return throwError(err);
			}),
			tap(() => {
				this._responseMessage.showSuccessMessage(MessageTriggeredFrom.News, MessageMethod.Create);
			})
		);
	}

	public disableNews(newsId: string): Observable<OperationResultResponse<{}>> {
		const disableRequest: NewsPatchOperation = { op: 'replace', path: '/IsActive', value: false };
		return this._newsService.editNews({ newsId, body: [disableRequest] }).pipe(
			catchError((err) => {
				this._responseMessage.showErrorMessage(err);
				return throwError(err);
			}),
			tap(() => {
				this._responseMessage.showSuccessMessage(MessageTriggeredFrom.News, MessageMethod.Remove);
			})
		);
	}

	public editNews(newsId: string, body: EditNewsRequest): Observable<OperationResultResponse<{}>> {
		return this._newsService.editNews({ newsId, body }).pipe(
			catchError((err) => {
				this._responseMessage.showErrorMessage(err);
				return throwError(err);
			}),
			tap(() => {
				this._responseMessage.showSuccessMessage(MessageTriggeredFrom.News, MessageMethod.Edit);
			})
		);
	}

	public findNews(params: IFindNewsRequest): Observable<OperationResultResponse<NewsInfo[]>> {
		return this._newsService.findNews(params);
	}

	public getNews(newsId: string): Observable<OperationResultResponse<IGetNewsResponse>> {
		return this._newsService.getNews({ newsId });
	}
}
