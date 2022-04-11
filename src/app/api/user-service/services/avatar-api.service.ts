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

import { CreateAvatarRequest } from '../models/create-avatar-request';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseImagesResponse } from '../models/operation-result-response-images-response';
import { RemoveAvatarRequest } from '../models/remove-avatar-request';

@Injectable({
	providedIn: 'root',
})
export class AvatarApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createAvatar
	 */
	static readonly CreateAvatarPath = '/avatar/create';

	/**
	 * The method attempts to add image to user.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createAvatar()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createAvatar$Response(params: {
		body: CreateAvatarRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, AvatarApiService.CreateAvatarPath, 'post');
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
	 * The method attempts to add image to user.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createAvatar$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createAvatar(params: { body: CreateAvatarRequest }): Observable<OperationResultResponse> {
		return this.createAvatar$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation getAvatar
	 */
	static readonly GetAvatarPath = '/avatar/get';

	/**
	 * This method is used to get all user avatars
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getAvatar()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getAvatar$Response(params: {
		userId: string;
	}): Observable<StrictHttpResponse<OperationResultResponseImagesResponse>> {
		const rb = new RequestBuilder(this.rootUrl, AvatarApiService.GetAvatarPath, 'get');
		if (params) {
			rb.query('userId', params.userId, {});
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
					return r as StrictHttpResponse<OperationResultResponseImagesResponse>;
				})
			);
	}

	/**
	 * This method is used to get all user avatars
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getAvatar$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getAvatar(params: { userId: string }): Observable<OperationResultResponseImagesResponse> {
		return this.getAvatar$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseImagesResponse>) =>
					r.body as OperationResultResponseImagesResponse
			)
		);
	}

	/**
	 * Path part for operation removeAvatar
	 */
	static readonly RemoveAvatarPath = '/avatar/remove';

	/**
	 * The method attempts to remove avatars from user
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `removeAvatar()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeAvatar$Response(params: {
		body: RemoveAvatarRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, AvatarApiService.RemoveAvatarPath, 'post');
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
	 * The method attempts to remove avatars from user
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `removeAvatar$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeAvatar(params: { body: RemoveAvatarRequest }): Observable<OperationResultResponse> {
		return this.removeAvatar$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation editAvatar
	 */
	static readonly EditAvatarPath = '/avatar/editcurrent';

	/**
	 * This method is used to change user's avatar
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editAvatar()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	editAvatar$Response(params: {
		userId: string;
		imageId: string;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, AvatarApiService.EditAvatarPath, 'get');
		if (params) {
			rb.query('userId', params.userId, {});
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
					return r as StrictHttpResponse<OperationResultResponse>;
				})
			);
	}

	/**
	 * This method is used to change user's avatar
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editAvatar$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	editAvatar(params: { userId: string; imageId: string }): Observable<OperationResultResponse> {
		return this.editAvatar$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
