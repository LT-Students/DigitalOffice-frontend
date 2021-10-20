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
import { OperationResultResponse } from '../models/operation-result-response';
import { UUID } from '@app/types/uuid.type';

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
		body: UUID[];
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
		body: UUID[];
	}): Observable<OperationResultResponse> {
		return this.removeProjectUsers$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
