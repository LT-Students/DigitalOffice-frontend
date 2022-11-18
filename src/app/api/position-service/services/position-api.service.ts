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

import { CreatePositionRequest } from '../models/create-position-request';
import { EditPositionRequest } from '../models/edit-position-request';
import { FindResultPositionInfo } from '../models/find-result-position-info';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponsePositionInfo } from '../models/operation-result-response-position-info';

@Injectable({
	providedIn: 'root',
})
export class PositionApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation getPosition
	 */
	static readonly GetPositionPath = '/position/get';

	/**
	 * Returns position by id.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getPosition()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getPosition$Response(params: {
		/**
		 * Position global unique identifier.
		 */
		positionId: string;
	}): Observable<StrictHttpResponse<OperationResultResponsePositionInfo>> {
		const rb = new RequestBuilder(this.rootUrl, PositionApiService.GetPositionPath, 'get');
		if (params) {
			rb.query('positionId', params.positionId, {});
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
					return r as StrictHttpResponse<OperationResultResponsePositionInfo>;
				})
			);
	}

	/**
	 * Returns position by id.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getPosition$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getPosition(params: {
		/**
		 * Position global unique identifier.
		 */
		positionId: string;
	}): Observable<OperationResultResponsePositionInfo> {
		return this.getPosition$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponsePositionInfo>) =>
					r.body as OperationResultResponsePositionInfo
			)
		);
	}

	/**
	 * Path part for operation findPositions
	 */
	static readonly FindPositionsPath = '/position/find';

	/**
	 * Returns all added positions.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findPositions()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findPositions$Response(params: {
		/**
		 * Number of positions to skip.
		 */
		skipcount: number;

		/**
		 * Number of positions to take.
		 */
		takecount: number;

		/**
		 * If true returns sorted positions from A to Z, false - sorted from Z to A, null - no sorting.
		 */
		isascendingsort?: boolean;

		/**
		 * If true returns both active and disactivated positions, false - only active
		 */
		includeDeactivated: boolean;

		/**
		 * Returns positions whose names contain a substring.
		 */
		nameincludesubstring?: string;
	}): Observable<StrictHttpResponse<FindResultPositionInfo>> {
		const rb = new RequestBuilder(this.rootUrl, PositionApiService.FindPositionsPath, 'get');
		if (params) {
			rb.query('skipcount', params.skipcount, {});
			rb.query('takecount', params.takecount, {});
			rb.query('isascendingsort', params.isascendingsort, {});
			rb.query('includeDeactivated', params.includeDeactivated, {});
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
					return r as StrictHttpResponse<FindResultPositionInfo>;
				})
			);
	}

	/**
	 * Returns all added positions.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findPositions$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findPositions(params: {
		/**
		 * Number of positions to skip.
		 */
		skipcount: number;

		/**
		 * Number of positions to take.
		 */
		takecount: number;

		/**
		 * If true returns sorted positions from A to Z, false - sorted from Z to A, null - no sorting.
		 */
		isascendingsort?: boolean;

		/**
		 * If true returns both active and disactivated positions, false - only active
		 */
		includeDeactivated: boolean;

		/**
		 * Returns positions whose names contain a substring.
		 */
		nameincludesubstring?: string;
	}): Observable<FindResultPositionInfo> {
		return this.findPositions$Response(params).pipe(
			map((r: StrictHttpResponse<FindResultPositionInfo>) => r.body as FindResultPositionInfo)
		);
	}

	/**
	 * Path part for operation createPosition
	 */
	static readonly CreatePositionPath = '/position/create';

	/**
	 * Adds a new position.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createPosition()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createPosition$Response(params: {
		body: CreatePositionRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, PositionApiService.CreatePositionPath, 'post');
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
	 * Adds a new position.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createPosition$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createPosition(params: { body: CreatePositionRequest }): Observable<OperationResultResponse> {
		return this.createPosition$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation editPosition
	 */
	static readonly EditPositionPath = '/position/edit';

	/**
	 * Edits a specified position.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editPosition()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editPosition$Response(params: {
		/**
		 * Specific position id
		 */
		positionId: string;
		body?: EditPositionRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, PositionApiService.EditPositionPath, 'patch');
		if (params) {
			rb.query('positionId', params.positionId, {});
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
	 * Edits a specified position.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editPosition$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editPosition(params: {
		/**
		 * Specific position id
		 */
		positionId: string;
		body?: EditPositionRequest;
	}): Observable<OperationResultResponse> {
		return this.editPosition$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
