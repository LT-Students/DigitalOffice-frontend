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

import { CreateCategoryRequest } from '../models/create-category-request';
import { FindResultResponseCategoryInfo } from '../models/find-result-response-category-info';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
	providedIn: 'root',
})
export class CategoryApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createCategory
	 */
	static readonly CreateCategoryPath = '/category/create';

	/**
	 * The method attempts to add department category.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createCategory()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createCategory$Response(params: {
		body: CreateCategoryRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, CategoryApiService.CreateCategoryPath, 'post');
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
	 * The method attempts to add department category.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createCategory$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createCategory(params: { body: CreateCategoryRequest }): Observable<OperationResultResponse> {
		return this.createCategory$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation findCategory
	 */
	static readonly FindCategoryPath = '/category/find';

	/**
	 * Returns all categories with pagination.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findCategory()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findCategory$Response(params: {
		/**
		 * Number of entries to skip.
		 */
		skipCount: number;

		/**
		 * Number of categories to take.
		 */
		takeCount: number;

		/**
		 * Find categories by substring.
		 */
		nameincludesubstring?: string;

		/**
		 * If true returns sorted categories from A to Z, false - sorted from Z to A, null - no sorting.
		 */
		isAscendingSort?: boolean;
	}): Observable<StrictHttpResponse<FindResultResponseCategoryInfo>> {
		const rb = new RequestBuilder(this.rootUrl, CategoryApiService.FindCategoryPath, 'get');
		if (params) {
			rb.query('skipCount', params.skipCount, {});
			rb.query('takeCount', params.takeCount, {});
			rb.query('nameincludesubstring', params.nameincludesubstring, {});
			rb.query('isAscendingSort', params.isAscendingSort, {});
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
					return r as StrictHttpResponse<FindResultResponseCategoryInfo>;
				})
			);
	}

	/**
	 * Returns all categories with pagination.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findCategory$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findCategory(params: {
		/**
		 * Number of entries to skip.
		 */
		skipCount: number;

		/**
		 * Number of categories to take.
		 */
		takeCount: number;

		/**
		 * Find categories by substring.
		 */
		nameincludesubstring?: string;

		/**
		 * If true returns sorted categories from A to Z, false - sorted from Z to A, null - no sorting.
		 */
		isAscendingSort?: boolean;
	}): Observable<FindResultResponseCategoryInfo> {
		return this.findCategory$Response(params).pipe(
			map((r: StrictHttpResponse<FindResultResponseCategoryInfo>) => r.body as FindResultResponseCategoryInfo)
		);
	}
}
