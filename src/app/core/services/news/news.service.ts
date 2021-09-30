import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsApiService } from '@data/api/news-service/services/news-api.service';
import { CreateNewsRequest } from '@data/api/news-service/models/create-news-request';
import { OperationResultResponse } from '@data/api/news-service/models/operation-result-response';
import { EditNewsRequest } from '@data/api/news-service/models/edit-news-request';
import { FindResultResponseNewsInfo } from '@data/api/news-service/models/find-result-response-news-info';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IFindNewsRequest {
	skipCount: number;
	takeCount: number;
	authorId?: string;
	departmentId?: string;
	includeDeactivated?: boolean;
}

@Injectable()
export class NewsService {
	constructor(private _newsService: NewsApiService, private _snackBar: MatSnackBar) {}

	public createNews(body: CreateNewsRequest): Observable<OperationResultResponse> {
		return this._newsService.createNews({ body });
	}

	public editNews(newsId: string, body: Array<EditNewsRequest>): Observable<OperationResultResponse> {
		return this._newsService.editNews({ newsId, body });
	}

	public findNews(params: IFindNewsRequest): Observable<Array<FindResultResponseNewsInfo>> {
		return this._newsService.findNews(params);
	}
}
