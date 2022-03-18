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

import { OperationResultResponseServiceEndpointsInfo } from '../models/operation-result-response-service-endpoints-info';

@Injectable({
	providedIn: 'root',
})
export class ServiceEndpointApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation getServiceEndpoint
	 */
	static readonly GetServiceEndpointPath = '/serviceendpoint/get';

	/**
	 * Returns ids of endpoints of service.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getServiceEndpoint()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getServiceEndpoint$Response(params: {
		serviceId: string;
	}): Observable<StrictHttpResponse<OperationResultResponseServiceEndpointsInfo>> {
		const rb = new RequestBuilder(this.rootUrl, ServiceEndpointApiService.GetServiceEndpointPath, 'get');
		if (params) {
			rb.query('serviceId', params.serviceId, {});
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
					return r as StrictHttpResponse<OperationResultResponseServiceEndpointsInfo>;
				})
			);
	}

	/**
	 * Returns ids of endpoints of service.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getServiceEndpoint$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getServiceEndpoint(params: { serviceId: string }): Observable<OperationResultResponseServiceEndpointsInfo> {
		return this.getServiceEndpoint$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseServiceEndpointsInfo>) =>
					r.body as OperationResultResponseServiceEndpointsInfo
			)
		);
	}
}
