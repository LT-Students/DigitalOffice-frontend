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

import { ActionResulFindFilesResponse } from '../models/action-resul-find-files-response';
import { RemoveFilesRequest } from '../models/remove-files-request';

@Injectable({
	providedIn: 'root',
})
export class FileApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation findFiles
	 */
	static readonly FindFilesPath = '/file/find';

	/**
	 * Find files in articles
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findFiles()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findFiles$Response(params: {
		/**
		 * Number of offices to skip.
		 */
		skipCount: number;

		/**
		 * Number of offices to take.
		 */
		takeCount: number;

		/**
		 * Article Id.
		 */
		articleid?: string;
	}): Observable<StrictHttpResponse<ActionResulFindFilesResponse>> {
		const rb = new RequestBuilder(this.rootUrl, FileApiService.FindFilesPath, 'get');
		if (params) {
			rb.query('skipCount', params.skipCount, {});
			rb.query('takeCount', params.takeCount, {});
			rb.query('articleid', params.articleid, {});
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
					return r as StrictHttpResponse<ActionResulFindFilesResponse>;
				})
			);
	}

	/**
	 * Find files in articles
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findFiles$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findFiles(params: {
		/**
		 * Number of offices to skip.
		 */
		skipCount: number;

		/**
		 * Number of offices to take.
		 */
		takeCount: number;

		/**
		 * Article Id.
		 */
		articleid?: string;
	}): Observable<ActionResulFindFilesResponse> {
		return this.findFiles$Response(params).pipe(
			map((r: StrictHttpResponse<ActionResulFindFilesResponse>) => r.body as ActionResulFindFilesResponse)
		);
	}

	/**
	 * Path part for operation removeFiles
	 */
	static readonly RemoveFilesPath = '/file/remove';

	/**
	 * Remove files from the article
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `removeFiles()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeFiles$Response(params: {
		body: RemoveFilesRequest;
	}): Observable<StrictHttpResponse<ActionResulFindFilesResponse>> {
		const rb = new RequestBuilder(this.rootUrl, FileApiService.RemoveFilesPath, 'delete');
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
					return r as StrictHttpResponse<ActionResulFindFilesResponse>;
				})
			);
	}

	/**
	 * Remove files from the article
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `removeFiles$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeFiles(params: { body: RemoveFilesRequest }): Observable<ActionResulFindFilesResponse> {
		return this.removeFiles$Response(params).pipe(
			map((r: StrictHttpResponse<ActionResulFindFilesResponse>) => r.body as ActionResulFindFilesResponse)
		);
	}
}
