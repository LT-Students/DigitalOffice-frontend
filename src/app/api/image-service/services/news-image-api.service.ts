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

import { CreateImageRequest } from '../models/create-image-request';
import { OperationResultResponseCreateImageNewsResponse } from '../models/operation-result-response-create-image-news-response';
import { OperationResultResponseImageResponse } from '../models/operation-result-response-image-response';

@Injectable({
	providedIn: 'root',
})
export class NewsImageApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation getNewsImage
	 */
	static readonly GetNewsImagePath = '/news/get';

	/**
	 * Returns image information of News.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getNewsImage()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getNewsImage$Response(params: {
		/**
		 * Image global unique identifier.
		 */
		imageId: string;
	}): Observable<StrictHttpResponse<OperationResultResponseImageResponse>> {
		const rb = new RequestBuilder(this.rootUrl, NewsImageApiService.GetNewsImagePath, 'get');
		if (params) {
			rb.query('imageId', params.imageId, {});
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
					return r as StrictHttpResponse<OperationResultResponseImageResponse>;
				})
			);
	}

	/**
	 * Returns image information of News.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getNewsImage$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getNewsImage(params: {
		/**
		 * Image global unique identifier.
		 */
		imageId: string;
	}): Observable<OperationResultResponseImageResponse> {
		return this.getNewsImage$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseImageResponse>) =>
					r.body as OperationResultResponseImageResponse
			)
		);
	}

	/**
	 * Path part for operation createNewsImage
	 */
	static readonly CreateNewsImagePath = '/news/create';

	/**
	 * Adds image and returns its Id.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createNewsImage()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createNewsImage$Response(params: {
		body: CreateImageRequest;
	}): Observable<StrictHttpResponse<OperationResultResponseCreateImageNewsResponse>> {
		const rb = new RequestBuilder(this.rootUrl, NewsImageApiService.CreateNewsImagePath, 'post');
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
					return r as StrictHttpResponse<OperationResultResponseCreateImageNewsResponse>;
				})
			);
	}

	/**
	 * Adds image and returns its Id.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createNewsImage$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createNewsImage(params: { body: CreateImageRequest }): Observable<OperationResultResponseCreateImageNewsResponse> {
		return this.createNewsImage$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseCreateImageNewsResponse>) =>
					r.body as OperationResultResponseCreateImageNewsResponse
			)
		);
	}
}
