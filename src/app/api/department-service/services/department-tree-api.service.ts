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

import { OperationResultResponseDepartmentsTreeInfo } from '../models/operation-result-response-departments-tree-info';

@Injectable({
	providedIn: 'root',
})
export class DepartmentTreeApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation getDepartmentTree
	 */
	static readonly GetDepartmentTreePath = '/departmentTree/get';

	/**
	 * Returns branch of departments.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getDepartmentTree()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getDepartmentTree$Response(params?: {}): Observable<
		StrictHttpResponse<OperationResultResponseDepartmentsTreeInfo>
	> {
		const rb = new RequestBuilder(this.rootUrl, DepartmentTreeApiService.GetDepartmentTreePath, 'get');
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
					return r as StrictHttpResponse<OperationResultResponseDepartmentsTreeInfo>;
				})
			);
	}

	/**
	 * Returns branch of departments.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getDepartmentTree$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getDepartmentTree(params?: {}): Observable<OperationResultResponseDepartmentsTreeInfo> {
		return this.getDepartmentTree$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseDepartmentsTreeInfo>) =>
					r.body as OperationResultResponseDepartmentsTreeInfo
			)
		);
	}
}
