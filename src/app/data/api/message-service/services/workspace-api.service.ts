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

import { CreateWorkspaceRequest } from '../models/create-workspace-request';
import { EditWorkspaceRequest } from '../models/edit-workspace-request';
import { FindResultResponseShortWorkspaceInfo } from '../models/find-result-response-short-workspace-info';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseWorkspaceInfo } from '../models/operation-result-response-workspace-info';

@Injectable({
	providedIn: 'root',
})
export class WorkspaceApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createWorkspace
	 */
	static readonly CreateWorkspacePath = '/workspace/create';

	/**
	 * Create a new workspace.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createWorkspace()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createWorkspace$Response(params: {
		body: CreateWorkspaceRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, WorkspaceApiService.CreateWorkspacePath, 'post');
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
	 * Create a new workspace.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createWorkspace$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createWorkspace(params: { body: CreateWorkspaceRequest }): Observable<OperationResultResponse> {
		return this.createWorkspace$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation findWorkspace
	 */
	static readonly FindWorkspacePath = '/workspace/find';

	/**
	 * Returns all workspaces information with pagination.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findWorkspace()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findWorkspace$Response(params: {
		/**
		 * Number of entries to skip
		 */
		skipCount: number;

		/**
		 * Number of unsent email to take.
		 */
		takeCount: number;
		includeDeactivated?: boolean;
	}): Observable<StrictHttpResponse<FindResultResponseShortWorkspaceInfo>> {
		const rb = new RequestBuilder(this.rootUrl, WorkspaceApiService.FindWorkspacePath, 'get');
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
					return r as StrictHttpResponse<FindResultResponseShortWorkspaceInfo>;
				})
			);
	}

	/**
	 * Returns all workspaces information with pagination.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findWorkspace$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findWorkspace(params: {
		/**
		 * Number of entries to skip
		 */
		skipCount: number;

		/**
		 * Number of unsent email to take.
		 */
		takeCount: number;
		includeDeactivated?: boolean;
	}): Observable<FindResultResponseShortWorkspaceInfo> {
		return this.findWorkspace$Response(params).pipe(
			map(
				(r: StrictHttpResponse<FindResultResponseShortWorkspaceInfo>) =>
					r.body as FindResultResponseShortWorkspaceInfo
			)
		);
	}

	/**
	 * Path part for operation getWorkspace
	 */
	static readonly GetWorkspacePath = '/workspace/get';

	/**
	 * Returns workspace information.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getWorkspace()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getWorkspace$Response(params: {
		/**
		 * Id of workspace.
		 */
		workspaceId: string;
		includeUsers?: boolean;
		includeChannels?: boolean;
	}): Observable<StrictHttpResponse<OperationResultResponseWorkspaceInfo>> {
		const rb = new RequestBuilder(this.rootUrl, WorkspaceApiService.GetWorkspacePath, 'get');
		if (params) {
			rb.query('workspaceId', params.workspaceId, {});
			rb.query('includeUsers', params.includeUsers, {});
			rb.query('includeChannels', params.includeChannels, {});
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
					return r as StrictHttpResponse<OperationResultResponseWorkspaceInfo>;
				})
			);
	}

	/**
	 * Returns workspace information.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getWorkspace$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getWorkspace(params: {
		/**
		 * Id of workspace.
		 */
		workspaceId: string;
		includeUsers?: boolean;
		includeChannels?: boolean;
	}): Observable<OperationResultResponseWorkspaceInfo> {
		return this.getWorkspace$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseWorkspaceInfo>) =>
					r.body as OperationResultResponseWorkspaceInfo
			)
		);
	}

	/**
	 * Path part for operation editWorkspace
	 */
	static readonly EditWorkspacePath = '/workspace/edit';

	/**
	 * Edit the specified workspace by id.
	 * * The user must have to be owner or admin.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editWorkspace()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editWorkspace$Response(params: {
		/**
		 * User global unique identifier.
		 */
		workspaceId: string;
		body: EditWorkspaceRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, WorkspaceApiService.EditWorkspacePath, 'patch');
		if (params) {
			rb.query('workspaceId', params.workspaceId, {});
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
	 * Edit the specified workspace by id.
	 * * The user must have to be owner or admin.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editWorkspace$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editWorkspace(params: {
		/**
		 * User global unique identifier.
		 */
		workspaceId: string;
		body: EditWorkspaceRequest;
	}): Observable<OperationResultResponse> {
		return this.editWorkspace$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation addWorkspaceUsers
	 */
	static readonly AddWorkspaceUsersPath = '/users/createworkspaceuser';

	/**
	 * Adds a new users to workspace.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `addWorkspaceUsers()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	addWorkspaceUsers$Response(params: {
		/**
		 * Workspace global unique identifier.
		 */
		workspaceid: string;
		body: Array<string>;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, WorkspaceApiService.AddWorkspaceUsersPath, 'post');
		if (params) {
			rb.query('workspaceid', params.workspaceid, {});
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
	 * Adds a new users to workspace.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `addWorkspaceUsers$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	addWorkspaceUsers(params: {
		/**
		 * Workspace global unique identifier.
		 */
		workspaceid: string;
		body: Array<string>;
	}): Observable<OperationResultResponse> {
		return this.addWorkspaceUsers$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation removeUsers
	 */
	static readonly RemoveUsersPath = '/users/removeworkspaceuser';

	/**
	 * Remove users from Workspace.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `removeUsers()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeUsers$Response(params: {
		/**
		 * workspace global unique identifier.
		 */
		workspaceid: string;
		body: Array<string>;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, WorkspaceApiService.RemoveUsersPath, 'delete');
		if (params) {
			rb.query('workspaceid', params.workspaceid, {});
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
	 * Remove users from Workspace.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `removeUsers$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeUsers(params: {
		/**
		 * workspace global unique identifier.
		 */
		workspaceid: string;
		body: Array<string>;
	}): Observable<OperationResultResponse> {
		return this.removeUsers$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
