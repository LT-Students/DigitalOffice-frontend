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

import { CreateCredentialsRequest } from '../models/create-credentials-request';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseCredentialsResponse } from '../models/operation-result-response-credentials-response';

@Injectable({
	providedIn: 'root',
})
export class CredentialsApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createCredentials
	 */
	static readonly CreateCredentialsPath = '/credentials/create';

	/**
	 * This endpoint must be used only for user first time login operation.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createCredentials()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createCredentials$Response(params?: {
		body?: CreateCredentialsRequest;
	}): Observable<StrictHttpResponse<OperationResultResponseCredentialsResponse>> {
		const rb = new RequestBuilder(this.rootUrl, CredentialsApiService.CreateCredentialsPath, 'post');
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
					return r as StrictHttpResponse<OperationResultResponseCredentialsResponse>;
				})
			);
	}

	/**
	 * This endpoint must be used only for user first time login operation.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createCredentials$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createCredentials(params?: {
		body?: CreateCredentialsRequest;
	}): Observable<OperationResultResponseCredentialsResponse> {
		return this.createCredentials$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseCredentialsResponse>) =>
					r.body as OperationResultResponseCredentialsResponse
			)
		);
	}

	/**
	 * Path part for operation checkPendingCredentials
	 */
	static readonly CheckPendingCredentialsPath = '/credentials/checkpending';

	/**
	 * This endpoint must be used only for user first time login operation.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `checkPendingCredentials()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	checkPendingCredentials$Response(params: {
		/**
		 * Unique user identifier.
		 */
		userid: string;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, CredentialsApiService.CheckPendingCredentialsPath, 'get');
		if (params) {
			rb.query('userid', params.userid, {});
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
	 * This endpoint must be used only for user first time login operation.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `checkPendingCredentials$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	checkPendingCredentials(params: {
		/**
		 * Unique user identifier.
		 */
		userid: string;
	}): Observable<OperationResultResponse> {
		return this.checkPendingCredentials$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
