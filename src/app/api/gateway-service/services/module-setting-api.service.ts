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

import { CheckSmtpRequest } from '../models/check-smtp-request';
import { EditModuleSettingRequest } from '../models/edit-module-setting-request';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
	providedIn: 'root',
})
export class ModuleSettingApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation editModuleSetting
	 */
	static readonly EditModuleSettingPath = '/ModuleSetting/edit';

	/**
	 * Changes module setting.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editModuleSetting()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editModuleSetting$Response(params?: {
		moduleSettingId?: string;
		body?: Array<EditModuleSettingRequest>;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, ModuleSettingApiService.EditModuleSettingPath, 'patch');
		if (params) {
			rb.query('moduleSettingId', params.moduleSettingId, {});
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
	 * Changes module setting.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editModuleSetting$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editModuleSetting(params?: {
		moduleSettingId?: string;
		body?: Array<EditModuleSettingRequest>;
	}): Observable<OperationResultResponse> {
		return this.editModuleSetting$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation checkSmtp
	 */
	static readonly CheckSmtpPath = '/Modulesetting/check';

	/**
	 * Sends email message from SMTP; returns true or false
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `checkSmtp()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	checkSmtp$Response(params?: { body?: CheckSmtpRequest }): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, ModuleSettingApiService.CheckSmtpPath, 'put');
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
	 * Sends email message from SMTP; returns true or false
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `checkSmtp$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	checkSmtp(params?: { body?: CheckSmtpRequest }): Observable<OperationResultResponse> {
		return this.checkSmtp$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
