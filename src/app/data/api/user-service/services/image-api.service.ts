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

import { AddImagesRequest } from '../models/add-images-request';
import { OperationResultResponse } from '../models/operation-result-response';
import { RemoveImagesRequest } from '../models/remove-images-request';

@Injectable({
	providedIn: 'root',
})
export class ImageApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation addImages
	 */
	static readonly AddImagesPath = '/image/add';

	/**
	 * The method attempts to add image to user/certificate/education. The user must have the rights to add images to other users - Add/Edit/Remove users.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `addImages()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	addImages$Response(params: { body: AddImagesRequest }): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, ImageApiService.AddImagesPath, 'post');
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
	 * The method attempts to add image to user/certificate/education. The user must have the rights to add images to other users - Add/Edit/Remove users.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `addImages$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	addImages(params: { body: AddImagesRequest }): Observable<OperationResultResponse> {
		return this.addImages$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation getImages
	 */
	static readonly GetImagesPath = '/image/get';

	/**
	 * This method is used to get all images, that belong to entity
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getImages()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getImages$Response(params: {
		entityId: string;
		entityType: 'user' | 'certificate' | 'education';
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, ImageApiService.GetImagesPath, 'get');
		if (params) {
			rb.query('entityId', params.entityId, {});
			rb.query('entityType', params.entityType, {});
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
	 * This method is used to get all images, that belong to entity
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getImages$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getImages(params: {
		entityId: string;
		entityType: 'user' | 'certificate' | 'education';
	}): Observable<OperationResultResponse> {
		return this.getImages$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation removeImages
	 */
	static readonly RemoveImagesPath = '/image/remove';

	/**
	 * The method attempts to remove images from entity
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `removeImages()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeImages$Response(params: {
		body: RemoveImagesRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, ImageApiService.RemoveImagesPath, 'post');
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
	 * The method attempts to remove images from entity
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `removeImages$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeImages(params: { body: RemoveImagesRequest }): Observable<OperationResultResponse> {
		return this.removeImages$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
