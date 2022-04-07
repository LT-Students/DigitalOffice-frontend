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

import { OperationResultResponseChannelResponse } from '../models/operation-result-response-channel-response';

@Injectable({
	providedIn: 'root',
})
export class ChannelApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation getChannel
	 */
	static readonly GetChannelPath = '/channel/get';

	/**
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getChannel()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getChannel$Response(params: {
		/**
		 * channel global unique identifier.
		 */
		channelId: string;

		/**
		 * Number of channel news to skip.
		 */
		skipCount?: number;

		/**
		 * Number of channe news to take.
		 */
		takeCount?: number;
		includeNews?: boolean;
	}): Observable<StrictHttpResponse<OperationResultResponseChannelResponse>> {
		const rb = new RequestBuilder(this.rootUrl, ChannelApiService.GetChannelPath, 'get');
		if (params) {
			rb.query('channelId', params.channelId, {});
			rb.query('skipCount', params.skipCount, {});
			rb.query('takeCount', params.takeCount, {});
			rb.query('includeNews', params.includeNews, {});
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
					return r as StrictHttpResponse<OperationResultResponseChannelResponse>;
				})
			);
	}

	/**
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getChannel$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getChannel(params: {
		/**
		 * channel global unique identifier.
		 */
		channelId: string;

		/**
		 * Number of channel news to skip.
		 */
		skipCount?: number;

		/**
		 * Number of channe news to take.
		 */
		takeCount?: number;
		includeNews?: boolean;
	}): Observable<OperationResultResponseChannelResponse> {
		return this.getChannel$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseChannelResponse>) =>
					r.body as OperationResultResponseChannelResponse
			)
		);
	}
}
