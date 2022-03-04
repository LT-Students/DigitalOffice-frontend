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
import { OperationResultResponseCredentialsResponse } from '../models/operation-result-response-credentials-response';
import { ReactivateCredentialsRequest } from '../models/reactivate-credentials-request';

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
	 * Path part for operation reactivateCredentials
	 */
	static readonly ReactivateCredentialsPath = '/credentials/reactivate';

	/**
	 * This endpoint must be used only for reactivate user credentials.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `reactivateCredentials()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	reactivateCredentials$Response(params?: {
		body?: ReactivateCredentialsRequest;
	}): Observable<StrictHttpResponse<OperationResultResponseCredentialsResponse>> {
		const rb = new RequestBuilder(this.rootUrl, CredentialsApiService.ReactivateCredentialsPath, 'put');
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
	 * This endpoint must be used only for reactivate user credentials.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `reactivateCredentials$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	reactivateCredentials(params?: {
		body?: ReactivateCredentialsRequest;
	}): Observable<OperationResultResponseCredentialsResponse> {
		return this.reactivateCredentials$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseCredentialsResponse>) =>
					r.body as OperationResultResponseCredentialsResponse
			)
		);
	}
}
