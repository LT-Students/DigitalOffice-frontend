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

import { CreateDepartmentRequest } from '../models/create-department-request';
import { EditDepartmentRequest } from '../models/edit-department-request';
import { EditDepartmentUsersAssignmentRequest } from '../models/edit-department-users-assignment-request';
import { EditDepartmentUsersRoleRequest } from '../models/edit-department-users-role-request';
import { FindResultResponseDepartmentInfo } from '../models/find-result-response-department-info';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseDepartmentResponse } from '../models/operation-result-response-department-response';

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
		departmentId: string;

		/**
		 * Response would include department users.
		 */
		includeUsers?: boolean;

		/**
		 * Response would include department category.
		 */
		includeCategory: boolean;
	}): Observable<StrictHttpResponse<OperationResultResponseDepartmentResponse>> {
		const rb = new RequestBuilder(this.rootUrl, DepartmentApiService.GetDepartmentPath, 'get');
		if (params) {
			rb.query('departmentId', params.departmentId, {});
			rb.query('includeUsers', params.includeUsers, {});
			rb.query('includeCategory', params.includeCategory, {});
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
					return r as StrictHttpResponse<OperationResultResponseDepartmentResponse>;
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
		departmentId: string;

		/**
		 * Response would include department users.
		 */
		includeUsers?: boolean;

		/**
		 * Response would include department category.
		 */
		includeCategory: boolean;
	}): Observable<OperationResultResponseDepartmentResponse> {
		return this.getDepartment$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseDepartmentResponse>) =>
					r.body as OperationResultResponseDepartmentResponse
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
		 * If true returns sorted departments from A to Z, false - sorted from Z to A, null - no sorting.
		 */
		isAscendingSort?: boolean;

		/**
		 * If true returns active departmnts, false - not active, null - all departments.
		 */
		isActive?: boolean;

		/**
		 * Returns departments whose names contain a substring.
		 */
		nameIncludeSubstring?: string;
	}): Observable<StrictHttpResponse<FindResultResponseDepartmentInfo>> {
		const rb = new RequestBuilder(this.rootUrl, DepartmentApiService.FindDepartmentsPath, 'get');
		if (params) {
			rb.query('skipCount', params.skipCount, {});
			rb.query('takeCount', params.takeCount, {});
			rb.query('isAscendingSort', params.isAscendingSort, {});
			rb.query('isActive', params.isActive, {});
			rb.query('nameIncludeSubstring', params.nameIncludeSubstring, {});
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
		 * If true returns sorted departments from A to Z, false - sorted from Z to A, null - no sorting.
		 */
		isAscendingSort?: boolean;

		/**
		 * If true returns active departmnts, false - not active, null - all departments.
		 */
		isActive?: boolean;

		/**
		 * Returns departments whose names contain a substring.
		 */
		nameIncludeSubstring?: string;
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
	 * Path part for operation editDepartmentUserRole
	 */
	static readonly EditDepartmentUserRolePath = '/user/editRole';

	/**
	 * Edit department users role.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editDepartmentUserRole()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editDepartmentUserRole$Response(params: {
		/**
		 * Department global unique identifier.
		 */
		departmentid: string;
		body: EditDepartmentUsersRoleRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, DepartmentApiService.EditDepartmentUserRolePath, 'put');
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
	 * Edit department users role.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editDepartmentUserRole$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editDepartmentUserRole(params: {
		/**
		 * Department global unique identifier.
		 */
		departmentid: string;
		body: EditDepartmentUsersRoleRequest;
	}): Observable<OperationResultResponse> {
		return this.editDepartmentUserRole$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation editDepartmentUserAssingment
	 */
	static readonly EditDepartmentUserAssingmentPath = '/user/editAssignment';

	/**
	 * Edit department users assignment.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editDepartmentUserAssingment()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editDepartmentUserAssingment$Response(params: {
		/**
		 * Department global unique identifier.
		 */
		departmentid: string;
		body: EditDepartmentUsersAssignmentRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, DepartmentApiService.EditDepartmentUserAssingmentPath, 'put');
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
	 * Edit department users assignment.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editDepartmentUserAssingment$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editDepartmentUserAssingment(params: {
		/**
		 * Department global unique identifier.
		 */
		departmentid: string;
		body: EditDepartmentUsersAssignmentRequest;
	}): Observable<OperationResultResponse> {
		return this.editDepartmentUserAssingment$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
