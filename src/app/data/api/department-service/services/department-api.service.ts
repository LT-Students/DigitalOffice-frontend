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

import { AddDepartmentUsersRequest } from '../models/add-department-users-request';
import { CreateDepartmentRequest } from '../models/create-department-request';
import { EditDepartmentRequest } from '../models/edit-department-request';
import { FindResultResponseDepartmentInfo } from '../models/find-result-response-department-info';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseDepartmentInfo } from '../models/operation-result-response-department-info';

@Injectable({
	providedIn: 'root',
})
export class DepartmentApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createDepartment
	 */
	static readonly CreateDepartmentPath = '/department/create';

	/**
	 * Create a new department.
	 * * __The user must have access to the right__ -- Add/Edit/Remove departments.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createDepartment()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createDepartment$Response(params: {
		body: CreateDepartmentRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, DepartmentApiService.CreateDepartmentPath, 'post');
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
	 * Create a new department.
	 * * __The user must have access to the right__ -- Add/Edit/Remove departments.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createDepartment$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createDepartment(params: { body: CreateDepartmentRequest }): Observable<OperationResultResponse> {
		return this.createDepartment$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation getDepartment
	 */
	static readonly GetDepartmentPath = '/department/get';

	/**
	 * Returns department by id.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getDepartment()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getDepartment$Response(params: {
		/**
		 * Department global unique identifier.
		 */
		departmentid: string;

		/**
		 * Response would include department users.
		 */
		includeusers?: boolean;

		/**
		 * Response would include department projects.
		 */
		includeprojects?: boolean;
	}): Observable<StrictHttpResponse<OperationResultResponseDepartmentInfo>> {
		const rb = new RequestBuilder(this.rootUrl, DepartmentApiService.GetDepartmentPath, 'get');
		if (params) {
			rb.query('departmentid', params.departmentid, {});
			rb.query('includeusers', params.includeusers, {});
			rb.query('includeprojects', params.includeprojects, {});
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
					return r as StrictHttpResponse<OperationResultResponseDepartmentInfo>;
				})
			);
	}

	/**
	 * Returns department by id.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getDepartment$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getDepartment(params: {
		/**
		 * Department global unique identifier.
		 */
		departmentid: string;

		/**
		 * Response would include department users.
		 */
		includeusers?: boolean;

		/**
		 * Response would include department projects.
		 */
		includeprojects?: boolean;
	}): Observable<OperationResultResponseDepartmentInfo> {
		return this.getDepartment$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseDepartmentInfo>) =>
					r.body as OperationResultResponseDepartmentInfo
			)
		);
	}

	/**
	 * Path part for operation findDepartments
	 */
	static readonly FindDepartmentsPath = '/department/find';

	/**
	 * Returns finded departments.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findDepartments()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findDepartments$Response(params: {
		/**
		 * Number of deparments to skip.
		 */
		skipCount: number;

		/**
		 * Number of departments to take.
		 */
		takeCount: number;

		/**
		 * If it is true, response will be have deactivated records.
		 */
		includeDeactivated?: boolean;
	}): Observable<StrictHttpResponse<FindResultResponseDepartmentInfo>> {
		const rb = new RequestBuilder(this.rootUrl, DepartmentApiService.FindDepartmentsPath, 'get');
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
					return r as StrictHttpResponse<FindResultResponseDepartmentInfo>;
				})
			);
	}

	/**
	 * Returns finded departments.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findDepartments$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findDepartments(params: {
		/**
		 * Number of deparments to skip.
		 */
		skipCount: number;

		/**
		 * Number of departments to take.
		 */
		takeCount: number;

		/**
		 * If it is true, response will be have deactivated records.
		 */
		includeDeactivated?: boolean;
	}): Observable<FindResultResponseDepartmentInfo> {
		return this.findDepartments$Response(params).pipe(
			map((r: StrictHttpResponse<FindResultResponseDepartmentInfo>) => r.body as FindResultResponseDepartmentInfo)
		);
	}

	/**
	 * Path part for operation editDepartment
	 */
	static readonly EditDepartmentPath = '/department/edit';

	/**
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editDepartment()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editDepartment$Response(params: {
		/**
		 * Specific position id
		 */
		departmentId: string;
		body?: EditDepartmentRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, DepartmentApiService.EditDepartmentPath, 'patch');
		if (params) {
			rb.query('departmentId', params.departmentId, {});
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
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editDepartment$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editDepartment(params: {
		/**
		 * Specific position id
		 */
		departmentId: string;
		body?: EditDepartmentRequest;
	}): Observable<OperationResultResponse> {
		return this.editDepartment$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation addDepartmentUsers
	 */
	static readonly AddDepartmentUsersPath = '/users/create';

	/**
	 * Adds a new users to department.
	 * * __The user must have access to the right__ -- Add/Edit/Remove departments.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `addDepartmentUsers()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	addDepartmentUsers$Response(params: {
		body: AddDepartmentUsersRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, DepartmentApiService.AddDepartmentUsersPath, 'post');
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
	 * Adds a new users to department.
	 * * __The user must have access to the right__ -- Add/Edit/Remove departments.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `addDepartmentUsers$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	addDepartmentUsers(params: { body: AddDepartmentUsersRequest }): Observable<OperationResultResponse> {
		return this.addDepartmentUsers$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation removeUsers
	 */
	static readonly RemoveUsersPath = '/users/remove';

	/**
	 * Remove users from Department.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `removeUsers()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeUsers$Response(params: {
		/**
		 * Department global unique identifier.
		 */
		departmentid: string;
		body: Array<string>;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, DepartmentApiService.RemoveUsersPath, 'delete');
		if (params) {
			rb.query('departmentid', params.departmentid, {});
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
	 * Remove users from Department.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `removeUsers$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeUsers(params: {
		/**
		 * Department global unique identifier.
		 */
		departmentid: string;
		body: Array<string>;
	}): Observable<OperationResultResponse> {
		return this.removeUsers$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
