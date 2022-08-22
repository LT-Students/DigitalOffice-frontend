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

import { CreateOfficeUsers } from '../models/create-office-users';
import { OperationResultResponse } from '../models/operation-result-response';
import { RemoveOfficeUsers } from '../models/remove-office-users';

@Injectable({
	providedIn: 'root',
})
export class OfficeUsersApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createOfficeUsers
	 */
	static readonly CreateOfficeUsersPath = '/users/create';

	/**
	 * Create users in specified office.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createOfficeUsers()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createOfficeUsers$Response(params: {
		body: CreateOfficeUsers;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, OfficeUsersApiService.CreateOfficeUsersPath, 'post');
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
	 * Create users in specified office.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createOfficeUsers$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createOfficeUsers(params: { body: CreateOfficeUsers }): Observable<OperationResultResponse> {
		return this.createOfficeUsers$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation removeOfficeUsers
	 */
	static readonly RemoveOfficeUsersPath = '/users/remove';

	/**
	 * Remove users from specified office.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `removeOfficeUsers()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeOfficeUsers$Response(params: {
		body: RemoveOfficeUsers;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, OfficeUsersApiService.RemoveOfficeUsersPath, 'delete');
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
	 * Remove users from specified office.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `removeOfficeUsers$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeOfficeUsers(params: { body: RemoveOfficeUsers }): Observable<OperationResultResponse> {
		return this.removeOfficeUsers$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
