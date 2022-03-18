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

import { CreateLeaveTimeRequest } from '../models/create-leave-time-request';
import { EditLeaveTimeRequest } from '../models/edit-leave-time-request';
import { FindResultResponseLeaveTimeResponse } from '../models/find-result-response-leave-time-response';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
	providedIn: 'root',
})
export class LeaveTimeApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createLeaveTime
	 */
	static readonly CreateLeaveTimePath = '/leavetime/create';

	/**
	 * Sets the leavetime for the user.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createLeaveTime()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createLeaveTime$Response(params: {
		/**
		 * Needed for set leavetime.
		 */
		body: CreateLeaveTimeRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, LeaveTimeApiService.CreateLeaveTimePath, 'post');
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
	 * Sets the leavetime for the user.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createLeaveTime$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createLeaveTime(params: {
		/**
		 * Needed for set leavetime.
		 */
		body: CreateLeaveTimeRequest;
	}): Observable<OperationResultResponse> {
		return this.createLeaveTime$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation findLeaveTimes
	 */
	static readonly FindLeaveTimesPath = '/leavetime/find';

	/**
	 * Find leave times by filter.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findLeaveTimes()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findLeaveTimes$Response(params?: {
		userid?: string;
		starttime?: string;
		endtime?: string;
		includedeactivated?: boolean;
		takeCount?: number;
		skipCount?: number;
	}): Observable<StrictHttpResponse<FindResultResponseLeaveTimeResponse>> {
		const rb = new RequestBuilder(this.rootUrl, LeaveTimeApiService.FindLeaveTimesPath, 'get');
		if (params) {
			rb.query('userid', params.userid, {});
			rb.query('starttime', params.starttime, {});
			rb.query('endtime', params.endtime, {});
			rb.query('includedeactivated', params.includedeactivated, {});
			rb.query('takeCount', params.takeCount, {});
			rb.query('skipCount', params.skipCount, {});
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
					return r as StrictHttpResponse<FindResultResponseLeaveTimeResponse>;
				})
			);
	}

	/**
	 * Find leave times by filter.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findLeaveTimes$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findLeaveTimes(params?: {
		userid?: string;
		starttime?: string;
		endtime?: string;
		includedeactivated?: boolean;
		takeCount?: number;
		skipCount?: number;
	}): Observable<FindResultResponseLeaveTimeResponse> {
		return this.findLeaveTimes$Response(params).pipe(
			map(
				(r: StrictHttpResponse<FindResultResponseLeaveTimeResponse>) =>
					r.body as FindResultResponseLeaveTimeResponse
			)
		);
	}

	/**
	 * Path part for operation editLeaveTime
	 */
	static readonly EditLeaveTimePath = '/leavetime/edit';

	/**
	 * Editing specific leave time by Id.
	 * *  __User has edit only himself if his is not admin.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editLeaveTime()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editLeaveTime$Response(params: {
		/**
		 * Leave time global unique identifier.
		 */
		leaveTimeId: string;
		body: EditLeaveTimeRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, LeaveTimeApiService.EditLeaveTimePath, 'patch');
		if (params) {
			rb.query('leaveTimeId', params.leaveTimeId, {});
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
	 * Editing specific leave time by Id.
	 * *  __User has edit only himself if his is not admin.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editLeaveTime$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editLeaveTime(params: {
		/**
		 * Leave time global unique identifier.
		 */
		leaveTimeId: string;
		body: EditLeaveTimeRequest;
	}): Observable<OperationResultResponse> {
		return this.editLeaveTime$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
