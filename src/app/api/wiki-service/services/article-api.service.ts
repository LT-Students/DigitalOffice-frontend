/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ArticleResponse } from '../models/article-response';
import { CreateArticleRequest } from '../models/create-article-request';
import { EditArticleRequest } from '../models/edit-article-request';

@Injectable({
	providedIn: 'root',
})
export class ArticleApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createArticle
	 */
	static readonly CreateArticlePath = '/article/create';

	/**
	 * Creating new article. The user must have access right - Add/Edit/Remove Wiki.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createArticle()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createArticle$Response(params: { body: CreateArticleRequest }): Observable<StrictHttpResponse<string>> {
		const rb = new RequestBuilder(this.rootUrl, ArticleApiService.CreateArticlePath, 'post');
		if (params) {
			rb.body(params.body, 'application/json');
		}

		return this.http
			.request(
				rb.build({
					responseType: 'json',
					accept: 'application/json',
				})
			)
			.pipe(
				filter((r: any) => r instanceof HttpResponse),
				map((r: HttpResponse<any>) => {
					return r as StrictHttpResponse<string>;
				})
			);
	}

	/**
	 * Creating new article. The user must have access right - Add/Edit/Remove Wiki.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createArticle$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createArticle(params: { body: CreateArticleRequest }): Observable<string> {
		return this.createArticle$Response(params).pipe(map((r: StrictHttpResponse<string>) => r.body as string));
	}

	/**
	 * Path part for operation getArticle
	 */
	static readonly GetArticlePath = '/article/get';

	/**
	 * Get an article by its Id
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getArticle()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getArticle$Response(params?: {
		/**
		 * Article global unique identifier.
		 */
		articleId?: string;
	}): Observable<StrictHttpResponse<ArticleResponse>> {
		const rb = new RequestBuilder(this.rootUrl, ArticleApiService.GetArticlePath, 'get');
		if (params) {
			rb.query('articleId', params.articleId, {});
		}

		return this.http
			.request(
				rb.build({
					responseType: 'json',
					accept: 'application/json',
				})
			)
			.pipe(
				filter((r: any) => r instanceof HttpResponse),
				map((r: HttpResponse<any>) => {
					return r as StrictHttpResponse<ArticleResponse>;
				})
			);
	}

	/**
	 * Get an article by its Id
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getArticle$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getArticle(params?: {
		/**
		 * Article global unique identifier.
		 */
		articleId?: string;
	}): Observable<ArticleResponse> {
		return this.getArticle$Response(params).pipe(
			map((r: StrictHttpResponse<ArticleResponse>) => r.body as ArticleResponse)
		);
	}

	/**
	 * Path part for operation editArticle
	 */
	static readonly EditArticlePath = '/article/edit';

	/**
	 * update article properties
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editArticle()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editArticle$Response(params: {
		/**
		 * unique article identifier
		 */
		articleId: string;
		body?: EditArticleRequest;
	}): Observable<StrictHttpResponse<boolean>> {
		const rb = new RequestBuilder(this.rootUrl, ArticleApiService.EditArticlePath, 'patch');
		if (params) {
			rb.query('articleId', params.articleId, {});
			rb.body(params.body, 'application/json');
		}

		return this.http
			.request(
				rb.build({
					responseType: 'json',
					accept: 'application/json',
				})
			)
			.pipe(
				filter((r: any) => r instanceof HttpResponse),
				map((r: HttpResponse<any>) => {
					return (r as HttpResponse<any>).clone({
						body: String((r as HttpResponse<any>).body) === 'true',
					}) as StrictHttpResponse<boolean>;
				})
			);
	}

	/**
	 * update article properties
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editArticle$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editArticle(params: {
		/**
		 * unique article identifier
		 */
		articleId: string;
		body?: EditArticleRequest;
	}): Observable<boolean> {
		return this.editArticle$Response(params).pipe(map((r: StrictHttpResponse<boolean>) => r.body as boolean));
	}
}
