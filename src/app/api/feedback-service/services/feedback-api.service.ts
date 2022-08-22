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

import { FeedbackStatusType } from '../models/feedback-status-type';
import { FeedbackType } from '../models/feedback-type';
import { FindResultResponseFeedbackInfo } from '../models/find-result-response-feedback-info';
import { OperationResultResponseFeedbackResponse } from '../models/operation-result-response-feedback-response';

@Injectable({
	providedIn: 'root',
})
export class FeedbackApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation findFeedbacks
	 */
	static readonly FindFeedbacksPath = '/feedback/find';

	/**
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findFeedbacks()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findFeedbacks$Response(params?: {
		/**
		 * Feedback status of the results
		 */
		feedbackstatus?: FeedbackStatusType;

		/**
		 * Feedback type of the results
		 */
		feedbacktype?: FeedbackType;

		/**
		 * Number of entries to skip
		 */
		skipCount?: number;

		/**
		 * Number of feedbacks to take.
		 */
		takeCount?: number;
	}): Observable<StrictHttpResponse<FindResultResponseFeedbackInfo>> {
		const rb = new RequestBuilder(this.rootUrl, FeedbackApiService.FindFeedbacksPath, 'get');
		if (params) {
			rb.query('feedbackstatus', params.feedbackstatus, {});
			rb.query('feedbacktype', params.feedbacktype, {});
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
					return r as StrictHttpResponse<FindResultResponseFeedbackInfo>;
				})
			);
	}

	/**
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findFeedbacks$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findFeedbacks(params?: {
		/**
		 * Feedback status of the results
		 */
		feedbackstatus?: FeedbackStatusType;

		/**
		 * Feedback type of the results
		 */
		feedbacktype?: FeedbackType;

		/**
		 * Number of entries to skip
		 */
		skipCount?: number;

		/**
		 * Number of feedbacks to take.
		 */
		takeCount?: number;
	}): Observable<FindResultResponseFeedbackInfo> {
		return this.findFeedbacks$Response(params).pipe(
			map((r: StrictHttpResponse<FindResultResponseFeedbackInfo>) => r.body as FindResultResponseFeedbackInfo)
		);
	}

	/**
	 * Path part for operation getFeedback
	 */
	static readonly GetFeedbackPath = '/feedback/get';

	/**
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getFeedback()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getFeedback$Response(params: {
		/**
		 * Feedback global unique identifier.
		 */
		feedbackId: string;
	}): Observable<StrictHttpResponse<OperationResultResponseFeedbackResponse>> {
		const rb = new RequestBuilder(this.rootUrl, FeedbackApiService.GetFeedbackPath, 'get');
		if (params) {
			rb.query('feedbackId', params.feedbackId, {});
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
					return r as StrictHttpResponse<OperationResultResponseFeedbackResponse>;
				})
			);
	}

	/**
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getFeedback$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getFeedback(params: {
		/**
		 * Feedback global unique identifier.
		 */
		feedbackId: string;
	}): Observable<OperationResultResponseFeedbackResponse> {
		return this.getFeedback$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseFeedbackResponse>) =>
					r.body as OperationResultResponseFeedbackResponse
			)
		);
	}
}
