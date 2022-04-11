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
	static readonly GetGraphicalUserInterfacePath = '/graphicaluserinterface/get';

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
}
