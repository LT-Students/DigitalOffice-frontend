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

import { FindResultResponseServiceConfigurationInfo } from '../models/find-result-response-service-configuration-info';
import { InstallAppRequest } from '../models/install-app-request';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
	providedIn: 'root',
})
export class AdminApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation installApp
	 */
	static readonly InstallAppPath = '/admin/install';

	/**
	 * Returns true or false.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `installApp()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	installApp$Response(params?: {
		body?: InstallAppRequest;
	}): Observable<StrictHttpResponse<FindResultResponseServiceConfigurationInfo>> {
		const rb = new RequestBuilder(this.rootUrl, AdminApiService.InstallAppPath, 'post');
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
					return r as StrictHttpResponse<FindResultResponseServiceConfigurationInfo>;
				})
			);
	}

	/**
	 * Returns true or false.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `installApp$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	installApp(params?: { body?: InstallAppRequest }): Observable<FindResultResponseServiceConfigurationInfo> {
		return this.installApp$Response(params).pipe(
			map(
				(r: StrictHttpResponse<FindResultResponseServiceConfigurationInfo>) =>
					r.body as FindResultResponseServiceConfigurationInfo
			)
		);
	}

	/**
	 * Path part for operation findServiceConfiguration
	 */
	static readonly FindServiceConfigurationPath = '/admin/find';

	/**
	 * Returns current configuration of all services.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findServiceConfiguration()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findServiceConfiguration$Response(params: {
		/**
		 * Number of entries to skip
		 */
		skipcount: number;

		/**
		 * Number of entries to take.
		 */
		takecount: number;
	}): Observable<StrictHttpResponse<FindResultResponseServiceConfigurationInfo>> {
		const rb = new RequestBuilder(this.rootUrl, AdminApiService.FindServiceConfigurationPath, 'get');
		if (params) {
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
					return r as StrictHttpResponse<FindResultResponseServiceConfigurationInfo>;
				})
			);
	}

	/**
	 * Returns current configuration of all services.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findServiceConfiguration$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findServiceConfiguration(params: {
		/**
		 * Number of entries to skip
		 */
		skipcount: number;

		/**
		 * Number of entries to take.
		 */
		takecount: number;
	}): Observable<FindResultResponseServiceConfigurationInfo> {
		return this.findServiceConfiguration$Response(params).pipe(
			map(
				(r: StrictHttpResponse<FindResultResponseServiceConfigurationInfo>) =>
					r.body as FindResultResponseServiceConfigurationInfo
			)
		);
	}

	/**
	 * Path part for operation editAdmin
	 */
	static readonly EditAdminPath = '/admin/edit';

	/**
	 * The method attempts to disable or enable services by changing the state to the opposite. The user must be admin.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editAdmin()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editAdmin$Response(params: { body: InstallAppRequest }): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, AdminApiService.EditAdminPath, 'put');
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
	 * The method attempts to disable or enable services by changing the state to the opposite. The user must be admin.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editAdmin$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editAdmin(params: { body: InstallAppRequest }): Observable<OperationResultResponse> {
		return this.editAdmin$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
