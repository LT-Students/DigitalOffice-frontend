import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsApiService } from '@data/api/news-service/services/news-api.service';
import { NewsRequest } from '@data/api/news-service/models/news-request';
import { NewsResponse } from '@data/api/news-service/models/news-response';

export interface IFindNewsRequest {
	/**
	 * Author global unique identifier.
	 */
	authorId?: string;
	/**
	 * Department global unique identifier.
	 */
	departmentId?: string;
	/**
	 * Pseudonym of news author.
	 */
	Pseudonym?: string;
	/**
	 * Subject of news.
	 */
	subject?: string;
}

@Injectable()
export class NewsService {
	constructor(private _newsService: NewsApiService) {}

	public createNews(body: NewsRequest): Observable<string> {
		return this._newsService.createNews({ body });
	}

	public editNews(body: NewsRequest): Observable<void>{
		return this._newsService.editNews({ body });
	}

	public findNews(params: IFindNewsRequest): Observable<NewsResponse> {
		return this._newsService.findnews(params);
	}
}
