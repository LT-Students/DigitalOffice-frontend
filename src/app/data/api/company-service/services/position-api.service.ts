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

import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponsePositionInfo } from '../models/operation-result-response-position-info';
import { FindResultResponsePositionInfo } from '@data/api/company-service/models/find-result-response-position-info';
import { IGetPositionRequest } from '@app/types/get-position-request.interface';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { IEditPositionRequest } from '@app/types/edit-position-request.interface';

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
	getPosition$Response(params: IGetPositionRequest): Observable<StrictHttpResponse<OperationResultResponsePositionInfo>> {
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
	getPosition(params: IGetPositionRequest): Observable<OperationResultResponsePositionInfo> {
		return this.getPosition$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponsePositionInfo>) => r.body as OperationResultResponsePositionInfo)
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
	findPositions$Response(params: IFindRequestEx): Observable<StrictHttpResponse<FindResultResponsePositionInfo>> {
		const rb = new RequestBuilder(this.rootUrl, PositionApiService.FindPositionsPath, 'get');
		if (params) {
			rb.query('skipCount', params.skipCount, {});
			rb.query('takeCount', params.takeCount, {});
			rb.query('includeDeactivated', params.includeDeactivated, {});
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
					return r as StrictHttpResponse<FindResultResponsePositionInfo>;
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
	findPositions(params: IFindRequestEx): Observable<FindResultResponsePositionInfo> {
		return this.findPositions$Response(params).pipe(
			map((r: StrictHttpResponse<FindResultResponsePositionInfo>) => r.body as FindResultResponsePositionInfo)
		);
	}

	/**
	 * Path part for operation addPosition
	 */
	static readonly AddPositionPath = '/position/create';

	/**
	 * Adds a new position.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `addPosition()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	addPosition$Response(params: { body: CreatePositionRequest }): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, PositionApiService.AddPositionPath, 'post');
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
	 * To access the full response (for headers, for example), `addPosition$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	addPosition(params: { body: CreatePositionRequest }): Observable<OperationResultResponse> {
		return this.addPosition$Response(params).pipe(map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse));
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
	editPosition$Response(params: IEditPositionRequest): Observable<StrictHttpResponse<OperationResultResponse>> {
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
	editPosition(params: IEditPositionRequest): Observable<OperationResultResponse> {
		return this.editPosition$Response(params).pipe(map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse));
	}
}
