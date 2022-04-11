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

import { OperationResultResponse } from '../models/operation-result-response';
import { Workspace } from '../models/workspace';

@Injectable({
	providedIn: 'root',
})
export class WorkspaceApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation create
	 */
	static readonly CreatePath = '/workspace/create';

	/**
	 * Create a new workspace.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `create()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	create$Response(params: { body: Workspace }): Observable<StrictHttpResponse<string>> {
		const rb = new RequestBuilder(this.rootUrl, WorkspaceApiService.CreatePath, 'post');
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
					return r as StrictHttpResponse<string>;
				})
			);
	}

	/**
	 * Create a new workspace.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `create$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	create(params: { body: Workspace }): Observable<string> {
		return this.create$Response(params).pipe(map((r: StrictHttpResponse<string>) => r.body as string));
	}

	/**
	 * Path part for operation remove
	 */
	static readonly RemovePath = '/workspace/remove';

	/**
	 * Deletes the specified workspace by id.
	 * * The user must have to be owner or admin.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `remove()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	remove$Response(params: {
		/**
		 * User global unique identifier.
		 */
		workspaceId: string;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, WorkspaceApiService.RemovePath, 'delete');
		if (params) {
			rb.query('workspaceId', params.workspaceId, {});
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
	 * Deletes the specified workspace by id.
	 * * The user must have to be owner or admin.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `remove$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	remove(params: {
		/**
		 * User global unique identifier.
		 */
		workspaceId: string;
	}): Observable<OperationResultResponse> {
		return this.remove$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
