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

import { EditGraphicalUserInterfaceSettingRequest } from '../models/edit-graphical-user-interface-setting-request';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseGuiInfo } from '../models/operation-result-response-gui-info';

@Injectable({
	providedIn: 'root',
})
export class GraphicalUserInterfaceApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation getGraphicalUserInterface
	 */
	static readonly GetGraphicalUserInterfacePath = '/GraphicalUserInterface/get';

	/**
	 * Returns GUI info.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getGraphicalUserInterface()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getGraphicalUserInterface$Response(params?: {}): Observable<StrictHttpResponse<OperationResultResponseGuiInfo>> {
		const rb = new RequestBuilder(
			this.rootUrl,
			GraphicalUserInterfaceApiService.GetGraphicalUserInterfacePath,
			'get'
		);
		if (params) {
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
					return r as StrictHttpResponse<OperationResultResponseGuiInfo>;
				})
			);
	}

	/**
	 * Returns GUI info.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getGraphicalUserInterface$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getGraphicalUserInterface(params?: {}): Observable<OperationResultResponseGuiInfo> {
		return this.getGraphicalUserInterface$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponseGuiInfo>) => r.body as OperationResultResponseGuiInfo)
		);
	}

	/**
	 * Path part for operation getGraphicalUserInterface_1
	 */
	static readonly GetGraphicalUserInterface_1Path = '/GraphicalUserInterface/edit';

	/**
	 * Edit Graphical User Interface
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getGraphicalUserInterface_1()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	getGraphicalUserInterface_1$Response(params?: {
		body?: Array<EditGraphicalUserInterfaceSettingRequest>;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(
			this.rootUrl,
			GraphicalUserInterfaceApiService.GetGraphicalUserInterface_1Path,
			'patch'
		);
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
	 * Edit Graphical User Interface
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getGraphicalUserInterface_1$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	getGraphicalUserInterface_1(params?: {
		body?: Array<EditGraphicalUserInterfaceSettingRequest>;
	}): Observable<OperationResultResponse> {
		return this.getGraphicalUserInterface_1$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
