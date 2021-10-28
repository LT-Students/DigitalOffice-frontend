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

import { CreateAchievementRequest } from '../models/create-achievement-request';
import { EditAchievementRequest } from '../models/edit-achievement-request';
import { FindResultResponseAchievementInfo } from '../models/find-result-response-achievement-info';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseAchievementResponse } from '../models/operation-result-response-achievement-response';

@Injectable({
	providedIn: 'root',
})
export class AchievementApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createAchievement
	 */
	static readonly CreateAchievementPath = '/achievement/create';

	/**
	 * The method attempts to create acievement. The sender must have the rights 'Add/Edit/Remove users' or must be an admin to create achievement.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createAchievement()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createAchievement$Response(params: {
		body: CreateAchievementRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, AchievementApiService.CreateAchievementPath, 'post');
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
	 * The method attempts to create acievement. The sender must have the rights 'Add/Edit/Remove users' or must be an admin to create achievement.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createAchievement$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createAchievement(params: { body: CreateAchievementRequest }): Observable<OperationResultResponse> {
		return this.createAchievement$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation editAchievement
	 */
	static readonly EditAchievementPath = '/achievement/edit';

	/**
	 * Edit the specified achievement by id.
	 * * The user must have to be owner or has right.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editAchievement()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editAchievement$Response(params: {
		/**
		 * Achievement global unique identifier.
		 */
		achievmentId: string;
		body: EditAchievementRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, AchievementApiService.EditAchievementPath, 'post');
		if (params) {
			rb.query('achievmentId', params.achievmentId, {});
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
	 * Edit the specified achievement by id.
	 * * The user must have to be owner or has right.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editAchievement$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editAchievement(params: {
		/**
		 * Achievement global unique identifier.
		 */
		achievmentId: string;
		body: EditAchievementRequest;
	}): Observable<OperationResultResponse> {
		return this.editAchievement$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation getAchievement
	 */
	static readonly GetAchievementPath = '/achievement/get';

	/**
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getAchievement()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getAchievement$Response(params: {
		/**
		 * Achievement global unique identifier.
		 */
		achievmentId: string;
	}): Observable<StrictHttpResponse<OperationResultResponseAchievementResponse>> {
		const rb = new RequestBuilder(this.rootUrl, AchievementApiService.GetAchievementPath, 'get');
		if (params) {
			rb.query('achievmentId', params.achievmentId, {});
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
					return r as StrictHttpResponse<OperationResultResponseAchievementResponse>;
				})
			);
	}

	/**
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getAchievement$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getAchievement(params: {
		/**
		 * Achievement global unique identifier.
		 */
		achievmentId: string;
	}): Observable<OperationResultResponseAchievementResponse> {
		return this.getAchievement$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseAchievementResponse>) =>
					r.body as OperationResultResponseAchievementResponse
			)
		);
	}

	/**
	 * Path part for operation findAchievement
	 */
	static readonly FindAchievementPath = '/achievement/find';

	/**
	 * Returns all achievement information by filter.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findAchievement()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findAchievement$Response(params: {
		/**
		 * Number of entries to skip.
		 */
		skipCount: number;

		/**
		 * Number of users to take.
		 */
		takeCount: number;
	}): Observable<StrictHttpResponse<Array<FindResultResponseAchievementInfo>>> {
		const rb = new RequestBuilder(this.rootUrl, AchievementApiService.FindAchievementPath, 'get');
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
					return r as StrictHttpResponse<Array<FindResultResponseAchievementInfo>>;
				})
			);
	}

	/**
	 * Returns all achievement information by filter.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findAchievement$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findAchievement(params: {
		/**
		 * Number of entries to skip.
		 */
		skipCount: number;

		/**
		 * Number of users to take.
		 */
		takeCount: number;
	}): Observable<Array<FindResultResponseAchievementInfo>> {
		return this.findAchievement$Response(params).pipe(
			map(
				(r: StrictHttpResponse<Array<FindResultResponseAchievementInfo>>) =>
					r.body as Array<FindResultResponseAchievementInfo>
			)
		);
	}
}
