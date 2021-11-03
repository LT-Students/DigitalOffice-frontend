import { Injectable } from '@angular/core';
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
	constructor(private _newsService: NewsApiService, private _snackBar: MatSnackBar) {}

	public createNews(body: CreateNewsRequest): Observable<OperationResultResponse<{}>> {
		return this._newsService.createNews({ body }).pipe(
			tap(() => this._snackBar.open('Новость успешно опубликована!', '×')),
			catchError((err) => {
				const errorMessage: string = err.error.errors[0] ?? 'Что-то пошло не так :(';
				this._snackBar.open(errorMessage, '×', { duration: 3000 });
				return throwError(err);
			})
		);
	}

	public disableNews(newsId: string): Observable<OperationResultResponse<{}>> {
		const disableRequest: NewsPatchOperation = { op: 'replace', path: '/IsActive', value: false };
		return this._newsService.editNews({ newsId, body: [disableRequest] }).pipe(
			tap(() => this._snackBar.open('Новость успешно удалена!', '×', { duration: 3000 })),
			catchError((err) => {
				const errorMessage: string = err.error.errors[0] ?? 'Что-то пошло не так :(';
				this._snackBar.open(errorMessage, '×', { duration: 3000 });
				return throwError(err);
			})
		);
	}

	public editNews(newsId: string, body: EditNewsRequest): Observable<OperationResultResponse<{}>> {
		return this._newsService.editNews({ newsId, body }).pipe(
			tap(() => this._snackBar.open('Новость успешно отредактирована!', '×', { duration: 3000 })),
			catchError((err) => {
				const errorMessage: string = err.error.errors[0] ?? 'Что-то пошло не так :(';
				this._snackBar.open(errorMessage, '×', { duration: 3000 });
				return throwError(err);
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
