import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { NewsApiService } from '@data/api/news-service/services/news-api.service';
import { CreateNewsRequest } from '@data/api/news-service/models/create-news-request';
import { OperationResultResponse } from '@data/api/news-service/models/operation-result-response';
import { EditNewsRequest } from '@data/api/news-service/models/edit-news-request';
import { FindResultResponseNewsInfo } from '@data/api/news-service/models/find-result-response-news-info';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OperationResultResponseNewsResponse } from '@data/api/news-service/models/operation-result-response-news-response';
import { catchError, tap } from 'rxjs/operators';
import { NewsPatchOperation } from '@data/api/news-service/models';

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

	public disableNews(newsId: string): Observable<OperationResultResponse> {
		const disableRequest: NewsPatchOperation = { op: 'replace', path: '/IsActive', value: false };
		return this._newsService.editNews({ newsId, body: [disableRequest] })
			.pipe(
				tap(() => this._snackBar.open('Новость успешно удалена!', 'x', { duration: 3000 })),
				catchError(err => {
					console.log
					this._snackBar.open('Что-то пошло не так :(', 'x', { duration: 3000 });
					return throwError(err);
				})
			);
	}

	public editNews(newsId: string, body: EditNewsRequest): Observable<OperationResultResponse> {
		return this._newsService.editNews({ newsId, body })
	}

	public findNews(params: IFindNewsRequest): Observable<FindResultResponseNewsInfo> {
		return this._newsService.findNews(params);
	}

	public getNews(newsId: string): Observable<OperationResultResponseNewsResponse> {
		return this._newsService.getNews({ newsId })
	}
}
