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

import { FileAccessType } from '../models/file-access-type';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
	providedIn: 'root',
})
export class FileApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createFile
	 */
	static readonly CreateFilePath = '/file/create';

	/**
	 * Create files.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createFile()` instead.
	 *
	 * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
	 */
	createFile$Response(params: {
		/**
		 * Entity global unique identifier.
		 */
		entityId: string;
		access: FileAccessType;
		body?: {
			uploadedFiles?: Blob;
		};
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, FileApiService.CreateFilePath, 'post');
		if (params) {
			rb.query('entityId', params.entityId, {});
			rb.query('access', params.access, {});
			rb.body(params.body, 'multipart/form-data');
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
	 * Create files.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createFile$Response()` instead.
	 *
	 * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
	 */
	createFile(params: {
		/**
		 * Entity global unique identifier.
		 */
		entityId: string;
		access: FileAccessType;
		body?: {
			uploadedFiles?: Blob;
		};
	}): Observable<OperationResultResponse> {
		return this.createFile$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation getFile
	 */
	static readonly GetFilePath = '/file/get';

	/**
	 * Returns the files by Ids.
	 *
	 * The method attempts to get the files by ids.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getFile()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getFile$Response(params: {
		/**
		 * Files global unique identifiers.
		 */
		filesIds: Array<string>;
	}): Observable<StrictHttpResponse<{}>> {
		const rb = new RequestBuilder(this.rootUrl, FileApiService.GetFilePath, 'get');
		if (params) {
			rb.query('filesIds', params.filesIds, {});
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
					return r as StrictHttpResponse<{}>;
				})
			);
	}

	/**
	 * Returns the files by Ids.
	 *
	 * The method attempts to get the files by ids.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getFile$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getFile(params: {
		/**
		 * Files global unique identifiers.
		 */
		filesIds: Array<string>;
	}): Observable<{}> {
		return this.getFile$Response(params).pipe(map((r: StrictHttpResponse<{}>) => r.body as {}));
	}

	/**
	 * Path part for operation editFile
	 */
	static readonly EditFilePath = '/file/edit';

	/**
	 * Editing file by Id.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editFile()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	editFile$Response(params: {
		/**
		 * File global unique identifier.
		 */
		fileId: string;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, FileApiService.EditFilePath, 'patch');
		if (params) {
			rb.query('fileId', params.fileId, {});
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
	 * Editing file by Id.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editFile$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	editFile(params: {
		/**
		 * File global unique identifier.
		 */
		fileId: string;
	}): Observable<OperationResultResponse> {
		return this.editFile$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
