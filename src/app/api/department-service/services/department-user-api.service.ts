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

import { CreateDepartmentUsersRequest } from '../models/create-department-users-request';
import { FindResultResponseUserInfo } from '../models/find-result-response-user-info';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
	providedIn: 'root',
})
export class DepartmentUserApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createDepartmentUser
	 */
	static readonly CreateDepartmentUserPath = '/user/create';

	/**
	 * Adds a new users to department.
	 * * __The user must have access to the right__ -- Add/Edit/Remove departments.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createDepartmentUser()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createDepartmentUser$Response(params: {
		body: CreateDepartmentUsersRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, DepartmentUserApiService.CreateDepartmentUserPath, 'post');
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
	 * To access the full response (for headers, for example), `createDepartmentUser$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createDepartmentUser(params: { body: CreateDepartmentUsersRequest }): Observable<OperationResultResponse> {
		return this.createDepartmentUser$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation findDepartmentUsers
	 */
	static readonly FindDepartmentUsersPath = '/user/find';

	/**
	 * Returns finded department users.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findDepartmentUsers()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findDepartmentUsers$Response(params: {
		/**
		 * Deparment id to find users.
		 */
		departmentId: string;

		/**
		 * Number of deparments to skip.
		 */
		skipCount: number;

		/**
		 * Number of departments to take.
		 */
		takeCount: number;

		/**
		 * If true returns sorted department users from A to Z, false - sorted from Z to A, null - no sorting.
		 */
		isAscendingSort?: boolean;

		/**
		 * If true returns sorted department users by role, false - sorted descending, null - no sorting.
		 */
		departmentUserRoleAscendingSort?: boolean;

		/**
		 * If true returns active departmnt users, false - not active, null - all.
		 */
		isActive?: boolean;

		/**
		 * If true returns departmnt users with avatars.
		 */
		includeAvatars?: boolean;

		/**
		 * If true returns departmnt users with positions.
		 */
		includePositions?: boolean;
	}): Observable<StrictHttpResponse<FindResultResponseUserInfo>> {
		const rb = new RequestBuilder(this.rootUrl, DepartmentUserApiService.FindDepartmentUsersPath, 'get');
		if (params) {
			rb.query('departmentId', params.departmentId, {});
			rb.query('skipCount', params.skipCount, {});
			rb.query('takeCount', params.takeCount, {});
			rb.query('isAscendingSort', params.isAscendingSort, {});
			rb.query('departmentUserRoleAscendingSort', params.departmentUserRoleAscendingSort, {});
			rb.query('isActive', params.isActive, {});
			rb.query('includeAvatars', params.includeAvatars, {});
			rb.query('includePositions', params.includePositions, {});
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
					return r as StrictHttpResponse<FindResultResponseUserInfo>;
				})
			);
	}

	/**
	 * Returns finded department users.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findDepartmentUsers$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findDepartmentUsers(params: {
		/**
		 * Deparment id to find users.
		 */
		departmentId: string;

		/**
		 * Number of deparments to skip.
		 */
		skipCount: number;

		/**
		 * Number of departments to take.
		 */
		takeCount: number;

		/**
		 * If true returns sorted department users from A to Z, false - sorted from Z to A, null - no sorting.
		 */
		isAscendingSort?: boolean;

		/**
		 * If true returns sorted department users by role, false - sorted descending, null - no sorting.
		 */
		departmentUserRoleAscendingSort?: boolean;

		/**
		 * If true returns active departmnt users, false - not active, null - all.
		 */
		isActive?: boolean;

		/**
		 * If true returns departmnt users with avatars.
		 */
		includeAvatars?: boolean;

		/**
		 * If true returns departmnt users with positions.
		 */
		includePositions?: boolean;
	}): Observable<FindResultResponseUserInfo> {
		return this.findDepartmentUsers$Response(params).pipe(
			map((r: StrictHttpResponse<FindResultResponseUserInfo>) => r.body as FindResultResponseUserInfo)
		);
	}

	/**
	 * Path part for operation removeDepartmentUser
	 */
	static readonly RemoveDepartmentUserPath = '/user/remove';

	/**
	 * Remove users from Department.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `removeDepartmentUser()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeDepartmentUser$Response(params: {
		/**
		 * Department global unique identifier.
		 */
		departmentid: string;
		body: Array<string>;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, DepartmentUserApiService.RemoveDepartmentUserPath, 'delete');
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
	 * To access the full response (for headers, for example), `removeDepartmentUser$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeDepartmentUser(params: {
		/**
		 * Department global unique identifier.
		 */
		departmentid: string;
		body: Array<string>;
	}): Observable<OperationResultResponse> {
		return this.removeDepartmentUser$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
