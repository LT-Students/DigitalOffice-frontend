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

import { CreateTagRequest } from '../models/create-tag-request';
import { EditNewsTagsRequest } from '../models/edit-news-tags-request';
import { FindResultResponseTagInfo } from '../models/find-result-response-tag-info';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
	providedIn: 'root',
})
export class TagApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createTag
	 */
	static readonly CreateTagPath = '/tag/create';

	/**
	 * Adds tag and returns its Id.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createTag()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createTag$Response(params: { body: CreateTagRequest }): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, TagApiService.CreateTagPath, 'post');
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
					return r as StrictHttpResponse<OperationResultResponse>;
				})
			);
	}

	/**
	 * Adds tag and returns its Id.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createTag$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createTag(params: { body: CreateTagRequest }): Observable<OperationResultResponse> {
		return this.createTag$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation editTag
	 */
	static readonly EditTagPath = '/tag/edit';

	/**
	 * Edit specified tags to news by news Id. Remove specified tags from news by news Id.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editTag()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editTag$Response(params: {
		/**
		 * News global unique identifier.
		 */
		newsId: string;
		body: EditNewsTagsRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, TagApiService.EditTagPath, 'put');
		if (params) {
			rb.query('newsId', params.newsId, {});
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
					return r as StrictHttpResponse<OperationResultResponse>;
				})
			);
	}

	/**
	 * Edit specified tags to news by news Id. Remove specified tags from news by news Id.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editTag$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editTag(params: {
		/**
		 * News global unique identifier.
		 */
		newsId: string;
		body: EditNewsTagsRequest;
	}): Observable<OperationResultResponse> {
		return this.editTag$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation findTag
	 */
	static readonly FindTagPath = '/tag/find';

	/**
	 * Returns all Tags information.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findTag()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findTag$Response(params: {
		/**
		 * Number of entries to skip.
		 */
		skipCount: number;

		/**
		 * Number of tags to take.
		 */
		takeCount: number;
	}): Observable<StrictHttpResponse<FindResultResponseTagInfo>> {
		const rb = new RequestBuilder(this.rootUrl, TagApiService.FindTagPath, 'get');
		if (params) {
			rb.query('skipCount', params.skipCount, {});
			rb.query('takeCount', params.takeCount, {});
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
					return r as StrictHttpResponse<FindResultResponseTagInfo>;
				})
			);
	}

	/**
	 * Returns all Tags information.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findTag$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findTag(params: {
		/**
		 * Number of entries to skip.
		 */
		skipCount: number;

		/**
		 * Number of tags to take.
		 */
		takeCount: number;
	}): Observable<FindResultResponseTagInfo> {
		return this.findTag$Response(params).pipe(
			map((r: StrictHttpResponse<FindResultResponseTagInfo>) => r.body as FindResultResponseTagInfo)
		);
	}
}
