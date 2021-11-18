import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsApiService } from '@data/api/news-service/services/news-api.service';
import { CreateNewsRequest } from '@data/api/news-service/models/create-news-request';
import { EditNewsRequest } from '@data/api/news-service/models/edit-news-request';

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
	constructor(private _newsService: NewsApiService, private _responseMessage: ResponseMessageModel) {}

	public createNews(body: CreateNewsRequest): Observable<OperationResultResponse<{}>> {
		return this._newsService
			.createNews({ body })
			.pipe(this._responseMessage.message(MessageTriggeredFrom.News, MessageMethod.Create));
	}

	public disableNews(newsId: string): Observable<OperationResultResponse<{}>> {
		const disableRequest: NewsPatchOperation = { op: 'replace', path: '/IsActive', value: false };
		return this._newsService
			.editNews({ newsId, body: [disableRequest] })
			.pipe(this._responseMessage.message(MessageTriggeredFrom.News, MessageMethod.Remove));
	}

	public editNews(newsId: string, body: EditNewsRequest): Observable<OperationResultResponse<{}>> {
		return this._newsService
			.editNews({ newsId, body })
			.pipe(this._responseMessage.message(MessageTriggeredFrom.News, MessageMethod.Edit));
	}

	public findNews(params: IFindNewsRequest): Observable<OperationResultResponse<NewsInfo[]>> {
		return this._newsService.findNews(params);
	}

	public getNews(newsId: string): Observable<OperationResultResponse<IGetNewsResponse>> {
		return this._newsService.getNews({ newsId });
	}
}
