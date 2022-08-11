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

import { FindResultResponseFileInfo } from '../models/find-result-response-file-info';
import { OperationResultResponse } from '../models/operation-result-response';
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
	 * Find files from Project.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findFiles()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findFiles$Response(params: {
		/**
		 * Number of entries to skip
		 */
		skipCount: number;

		/**
		 * Number of projects to take.
		 */
		takeCount: number;

		/**
		 * Return only files with specified project
		 */
		projectid?: string;
	}): Observable<StrictHttpResponse<FindResultResponseFileInfo>> {
		const rb = new RequestBuilder(this.rootUrl, FileApiService.FindFilesPath, 'get');
		if (params) {
			rb.query('skipCount', params.skipCount, {});
			rb.query('takeCount', params.takeCount, {});
			rb.query('projectid', params.projectid, {});
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
					return r as StrictHttpResponse<FindResultResponseFileInfo>;
				})
			);
	}

	/**
	 * Find files from Project.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findFiles$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findFiles(params: {
		/**
		 * Number of entries to skip
		 */
		skipCount: number;

		/**
		 * Number of projects to take.
		 */
		takeCount: number;

		/**
		 * Return only files with specified project
		 */
		projectid?: string;
	}): Observable<FindResultResponseFileInfo> {
		return this.findFiles$Response(params).pipe(
			map((r: StrictHttpResponse<FindResultResponseFileInfo>) => r.body as FindResultResponseFileInfo)
		);
	}

	/**
	 * Path part for operation removeFile
	 */
	static readonly RemoveFilePath = '/file/remove';

	/**
	 * Remove files from Project.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `removeFile()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeFile$Response(params: { body: RemoveFilesRequest }): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, FileApiService.RemoveFilePath, 'delete');
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
	 * Remove files from Project.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `removeFile$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	removeFile(params: { body: RemoveFilesRequest }): Observable<OperationResultResponse> {
		return this.removeFile$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation editFile
	 */
	static readonly EditFilePath = '/file/edit';

	/**
	 * Edit files from Project.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editFile()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	editFile$Response(params: {
		/**
		 * Id of the projectFile to take.
		 */
		fileId: string;

		/**
		 * New file access type.
		 */
		newAccessType: 'Manager' | 'Team' | 'Public';
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, FileApiService.EditFilePath, 'put');
		if (params) {
			rb.query('fileId', params.fileId, {});
			rb.query('newAccessType', params.newAccessType, {});
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
	 * Edit files from Project.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editFile$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	editFile(params: {
		/**
		 * Id of the projectFile to take.
		 */
		fileId: string;

		/**
		 * New file access type.
		 */
		newAccessType: 'Manager' | 'Team' | 'Public';
	}): Observable<OperationResultResponse> {
		return this.editFile$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
