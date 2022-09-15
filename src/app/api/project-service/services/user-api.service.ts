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

import { CreateProjectUsersRequest } from '../models/create-project-users-request';
import { EditProjectUsersRoleRequest } from '../models/edit-project-users-role-request';
import { FindResultResponseUserInfo } from '../models/find-result-response-user-info';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
	providedIn: 'root',
})
export class UserApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createProjectUsers
	 */
	static readonly CreateProjectUsersPath = '/user/create';

	/**
	 * Adding specific users to project.
	 * *  __The user must have access right__ -- Add/Edit/Remove projects.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createProjectUsers()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createProjectUsers$Response(params: {
		body: CreateProjectUsersRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, UserApiService.CreateProjectUsersPath, 'post');
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
	 * Adding specific users to project.
	 * *  __The user must have access right__ -- Add/Edit/Remove projects.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createProjectUsers$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createProjectUsers(params: { body: CreateProjectUsersRequest }): Observable<OperationResultResponse> {
		return this.createProjectUsers$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation findUsers
	 */
	static readonly FindUsersPath = '/user/find';

	/**
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findUsers()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findUsers$Response(params: {
		/**
		 * Project global unique identifier.
		 */
		projectId: string;

		/**
		 * Number of entries to skip
		 */
		skipCount: number;

		/**
		 * Number of projects to take.
		 */
		takeCount: number;

		/**
		 * true - only active users, false - only not-active, null(default) - all users.
		 */
		isActive?: boolean;

		/**
		 * true - ascending sort user, false - descending sort, null(default) - without sort.
		 */
		ascendingSort?: boolean;
		includeAvatars?: boolean;
		includePositions?: boolean;
	}): Observable<StrictHttpResponse<FindResultResponseUserInfo>> {
		const rb = new RequestBuilder(this.rootUrl, UserApiService.FindUsersPath, 'get');
		if (params) {
			rb.query('projectId', params.projectId, {});
			rb.query('skipCount', params.skipCount, {});
			rb.query('takeCount', params.takeCount, {});
			rb.query('isActive', params.isActive, {});
			rb.query('ascendingSort', params.ascendingSort, {});
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
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findUsers$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findUsers(params: {
		/**
		 * Project global unique identifier.
		 */
		projectId: string;

		/**
		 * Number of entries to skip
		 */
		skipCount: number;

		/**
		 * Number of projects to take.
		 */
		takeCount: number;

		/**
		 * true - only active users, false - only not-active, null(default) - all users.
		 */
		isActive?: boolean;

		/**
		 * true - ascending sort user, false - descending sort, null(default) - without sort.
		 */
		ascendingSort?: boolean;
		includeAvatars?: boolean;
		includePositions?: boolean;
	}): Observable<FindResultResponseUserInfo> {
		return this.findUsers$Response(params).pipe(
			map((r: StrictHttpResponse<FindResultResponseUserInfo>) => r.body as FindResultResponseUserInfo)
		);
	}

	/**
	 * Path part for operation editProjectUsers
	 */
	static readonly EditProjectUsersPath = '/user/editrole';

	/**
	 * Editing specific users in specific project.
	 * *  __The user must have access right__ -- Add/Edit/Remove projects.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editProjectUsers()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editProjectUsers$Response(params: {
		/**
		 * Project global unique identifier.
		 */
		projectId: string;
		body: EditProjectUsersRoleRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, UserApiService.EditProjectUsersPath, 'put');
		if (params) {
			rb.query('projectId', params.projectId, {});
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
	 * Editing specific users in specific project.
	 * *  __The user must have access right__ -- Add/Edit/Remove projects.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editProjectUsers$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editProjectUsers(params: {
		/**
		 * Project global unique identifier.
		 */
		projectId: string;
		body: EditProjectUsersRoleRequest;
	}): Observable<OperationResultResponse> {
		return this.editProjectUsers$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation removeProjectUsers
	 */
	static readonly RemoveProjectUsersPath = '/user/remove';

	/**
	 * Remove specific users from specific project.
	 * * __The user must have access right__ -- Add/Edit/Remove project.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `removeProjectUsers()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeProjectUsers$Response(params: {
		/**
		 * Project global unique identifier.
		 */
		projectId: string;
		body: Array<string>;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, UserApiService.RemoveProjectUsersPath, 'delete');
		if (params) {
			rb.query('projectId', params.projectId, {});
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
	 * Remove specific users from specific project.
	 * * __The user must have access right__ -- Add/Edit/Remove project.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `removeProjectUsers$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeProjectUsers(params: {
		/**
		 * Project global unique identifier.
		 */
		projectId: string;
		body: Array<string>;
	}): Observable<OperationResultResponse> {
		return this.removeProjectUsers$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
