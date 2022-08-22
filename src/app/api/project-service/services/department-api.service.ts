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

import { EditProjectDepartmentRequest } from '../models/edit-project-department-request';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
	providedIn: 'root',
})
export class DepartmentApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation editProjectDepartment
	 */
	static readonly EditProjectDepartmentPath = '/department/edit';

	/**
	 * The method attempts to change project department.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editProjectDepartment()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editProjectDepartment$Response(params: {
		body: EditProjectDepartmentRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, DepartmentApiService.EditProjectDepartmentPath, 'put');
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
	 * The method attempts to change project department.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editProjectDepartment$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editProjectDepartment(params: { body: EditProjectDepartmentRequest }): Observable<OperationResultResponse> {
		return this.editProjectDepartment$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
