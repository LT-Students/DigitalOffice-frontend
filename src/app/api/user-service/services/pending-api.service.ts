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

import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
	providedIn: 'root',
})
export class PendingApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation checkPending
	 */
	static readonly CheckPendingPath = '/pending/check';

	/**
	 * This endpoint must be used only for user first time login operation.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `checkPending()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	checkPending$Response(params: {
		/**
		 * Unique user identifier.
		 */
		userid: string;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, PendingApiService.CheckPendingPath, 'get');
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
	 * To access the full response (for headers, for example), `checkPending$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	checkPending(params: {
		/**
		 * Unique user identifier.
		 */
		userid: string;
	}): Observable<OperationResultResponse> {
		return this.checkPending$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation resendinvitationPending
	 */
	static readonly ResendinvitationPendingPath = '/pending/resendinvitation';

	/**
	 * Resend invitation email.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `resendinvitationPending()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	resendinvitationPending$Response(params: {
		/**
		 * User global unique identifier.
		 */
		userId: string;

		/**
		 * Communication global unique identifier.
		 */
		communicationId: string;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, PendingApiService.ResendinvitationPendingPath, 'get');
		if (params) {
			rb.query('userId', params.userId, {});
			rb.query('communicationId', params.communicationId, {});
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
	 * Resend invitation email.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `resendinvitationPending$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	resendinvitationPending(params: {
		/**
		 * User global unique identifier.
		 */
		userId: string;

		/**
		 * Communication global unique identifier.
		 */
		communicationId: string;
	}): Observable<OperationResultResponse> {
		return this.resendinvitationPending$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation removePending
	 */
	static readonly RemovePendingPath = '/pending/remove';

	/**
	 * Remove user from pending list.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `removePending()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	removePending$Response(params: {
		/**
		 * User global unique identifier.
		 */
		userId: string;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, PendingApiService.RemovePendingPath, 'delete');
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
					return r as StrictHttpResponse<OperationResultResponse>;
				})
			);
	}

	/**
	 * Remove user from pending list.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `removePending$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	removePending(params: {
		/**
		 * User global unique identifier.
		 */
		userId: string;
	}): Observable<OperationResultResponse> {
		return this.removePending$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
