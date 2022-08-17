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

import { FindResultResponseUnsentEmailInfo } from '../models/find-result-response-unsent-email-info';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
	providedIn: 'root',
})
export class UnsentEmailApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation resendUnsentEmail
	 */
	static readonly ResendUnsentEmailPath = '/UnsentEmail/resend';

	/**
	 * Removes unsent email if email was successfully resent.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `resendUnsentEmail()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	resendUnsentEmail$Response(params?: {
		unsentEmailId?: string;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, UnsentEmailApiService.ResendUnsentEmailPath, 'delete');
		if (params) {
			rb.query('unsentEmailId', params.unsentEmailId, {});
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
	 * Removes unsent email if email was successfully resent.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `resendUnsentEmail$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	resendUnsentEmail(params?: { unsentEmailId?: string }): Observable<OperationResultResponse> {
		return this.resendUnsentEmail$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation findUnsentEmail
	 */
	static readonly FindUnsentEmailPath = '/UnsentEmail/find';

	/**
	 * Returns all unsent emails information with pagination.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findUnsentEmail()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findUnsentEmail$Response(params: {
		/**
		 * Number of entries to skip
		 */
		skipcount: number;

		/**
		 * Number of entries to take.
		 */
		takecount: number;
	}): Observable<StrictHttpResponse<FindResultResponseUnsentEmailInfo>> {
		const rb = new RequestBuilder(this.rootUrl, UnsentEmailApiService.FindUnsentEmailPath, 'get');
		if (params) {
			rb.query('skipcount', params.skipcount, {});
			rb.query('takecount', params.takecount, {});
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
					return r as StrictHttpResponse<FindResultResponseUnsentEmailInfo>;
				})
			);
	}

	/**
	 * Returns all unsent emails information with pagination.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findUnsentEmail$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findUnsentEmail(params: {
		/**
		 * Number of entries to skip
		 */
		skipcount: number;

		/**
		 * Number of entries to take.
		 */
		takecount: number;
	}): Observable<FindResultResponseUnsentEmailInfo> {
		return this.findUnsentEmail$Response(params).pipe(
			map(
				(r: StrictHttpResponse<FindResultResponseUnsentEmailInfo>) =>
					r.body as FindResultResponseUnsentEmailInfo
			)
		);
	}
}
