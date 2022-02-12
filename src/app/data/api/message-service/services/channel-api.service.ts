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

import { CreateChannelRequest } from '../models/create-channel-request';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseChannelInfo } from '../models/operation-result-response-channel-info';

@Injectable({
	providedIn: 'root',
})
export class ChannelApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createChannel
	 */
	static readonly CreateChannelPath = '/channel/create';

	/**
	 * Create a new channel.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createChannel()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createChannel$Response(params: {
		body: CreateChannelRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, ChannelApiService.CreateChannelPath, 'post');
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
	 * Create a new channel.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createChannel$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createChannel(params: { body: CreateChannelRequest }): Observable<OperationResultResponse> {
		return this.createChannel$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation getChannel
	 */
	static readonly GetChannelPath = '/channel/get';

	/**
	 * Returns channel information.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getChannel()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getChannel$Response(params: {
		/**
		 * Id of channel.
		 */
		channelid: string;
		skipcount?: number;
		takecount: number;
	}): Observable<StrictHttpResponse<OperationResultResponseChannelInfo>> {
		const rb = new RequestBuilder(this.rootUrl, ChannelApiService.GetChannelPath, 'get');
		if (params) {
			rb.query('channelid', params.channelid, {});
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
					return r as StrictHttpResponse<OperationResultResponseChannelInfo>;
				})
			);
	}

	/**
	 * Returns channel information.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getChannel$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getChannel(params: {
		/**
		 * Id of channel.
		 */
		channelid: string;
		skipcount?: number;
		takecount: number;
	}): Observable<OperationResultResponseChannelInfo> {
		return this.getChannel$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseChannelInfo>) =>
					r.body as OperationResultResponseChannelInfo
			)
		);
	}

	/**
	 * Path part for operation addChannelUsers
	 */
	static readonly AddChannelUsersPath = '/users/createchanneluser';

	/**
	 * Adds a new users to channel.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `addChannelUsers()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	addChannelUsers$Response(params: {
		/**
		 * Channel global unique identifier.
		 */
		channelid: string;
		body: Array<string>;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, ChannelApiService.AddChannelUsersPath, 'post');
		if (params) {
			rb.query('channelid', params.channelid, {});
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
	 * Adds a new users to channel.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `addChannelUsers$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	addChannelUsers(params: {
		/**
		 * Channel global unique identifier.
		 */
		channelid: string;
		body: Array<string>;
	}): Observable<OperationResultResponse> {
		return this.addChannelUsers$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation removeUsers_1
	 */
	static readonly RemoveUsers_1Path = '/users/removechanneluser';

	/**
	 * Remove users from Channel.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `removeUsers_1()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeUsers_1$Response(params: {
		/**
		 * channel global unique identifier.
		 */
		channelid: string;
		body: Array<string>;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, ChannelApiService.RemoveUsers_1Path, 'delete');
		if (params) {
			rb.query('channelid', params.channelid, {});
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
	 * Remove users from Channel.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `removeUsers_1$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeUsers_1(params: {
		/**
		 * channel global unique identifier.
		 */
		channelid: string;
		body: Array<string>;
	}): Observable<OperationResultResponse> {
		return this.removeUsers_1$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
