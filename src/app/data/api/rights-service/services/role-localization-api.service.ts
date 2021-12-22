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

import { CreateRoleLocalizationRequest } from '../models/create-role-localization-request';
import { EditRoleLocalizationRequest } from '../models/edit-role-localization-request';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
	providedIn: 'root',
})
export class RoleLocalizationApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createRoleLocalization
	 */
	static readonly CreateRoleLocalizationPath = '/rolelocalization/create';

	/**
	 * The method attempts to create the role's localization. The user must be admin.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createRoleLocalization()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createRoleLocalization$Response(params: {
		body: CreateRoleLocalizationRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, RoleLocalizationApiService.CreateRoleLocalizationPath, 'post');
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
	 * The method attempts to create the role's localization. The user must be admin.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createRoleLocalization$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createRoleLocalization(params: { body: CreateRoleLocalizationRequest }): Observable<OperationResultResponse> {
		return this.createRoleLocalization$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation editRoleLocalization
	 */
	static readonly EditRoleLocalizationPath = '/rolelocalization/edit';

	/**
	 * Editing role's localization by Id. The user must be admin.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editRoleLocalization()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editRoleLocalization$Response(params: {
		roleLocalizationId: string;
		body: EditRoleLocalizationRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, RoleLocalizationApiService.EditRoleLocalizationPath, 'patch');
		if (params) {
			rb.query('roleLocalizationId', params.roleLocalizationId, {});
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
	 * Editing role's localization by Id. The user must be admin.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editRoleLocalization$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editRoleLocalization(params: {
		roleLocalizationId: string;
		body: EditRoleLocalizationRequest;
	}): Observable<OperationResultResponse> {
		return this.editRoleLocalization$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
