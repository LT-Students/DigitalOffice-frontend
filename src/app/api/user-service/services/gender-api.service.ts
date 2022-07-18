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

import { CreateGenderRequest } from '../models/create-gender-request';
import { FindResultResponseGenderInfo } from '../models/find-result-response-gender-info';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
	providedIn: 'root',
})
export class GenderApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createGender
	 */
	static readonly CreateGenderPath = '/gender/create';

	/**
	 * The method attempts to add gender.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createGender()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createGender$Response(params: {
		body: CreateGenderRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, GenderApiService.CreateGenderPath, 'post');
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
	 * The method attempts to add gender.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createGender$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createGender(params: { body: CreateGenderRequest }): Observable<OperationResultResponse> {
		return this.createGender$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation findGender
	 */
	static readonly FindGenderPath = '/gender/find';

	/**
	 * Returns all genders with pagination.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findGender()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findGender$Response(params: {
		/**
		 * Number of entries to skip.
		 */
		skipCount: number;

		/**
		 * Number of genders to take.
		 */
		takeCount: number;

		/**
		 * Find genders by substring.
		 */
		nameincludesubstring?: string;
	}): Observable<StrictHttpResponse<FindResultResponseGenderInfo>> {
		const rb = new RequestBuilder(this.rootUrl, GenderApiService.FindGenderPath, 'get');
		if (params) {
			rb.query('skipCount', params.skipCount, {});
			rb.query('takeCount', params.takeCount, {});
			rb.query('nameincludesubstring', params.nameincludesubstring, {});
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
					return r as StrictHttpResponse<FindResultResponseGenderInfo>;
				})
			);
	}

	/**
	 * Returns all genders with pagination.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findGender$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findGender(params: {
		/**
		 * Number of entries to skip.
		 */
		skipCount: number;

		/**
		 * Number of genders to take.
		 */
		takeCount: number;

		/**
		 * Find genders by substring.
		 */
		nameincludesubstring?: string;
	}): Observable<FindResultResponseGenderInfo> {
		return this.findGender$Response(params).pipe(
			map((r: StrictHttpResponse<FindResultResponseGenderInfo>) => r.body as FindResultResponseGenderInfo)
		);
	}
}
