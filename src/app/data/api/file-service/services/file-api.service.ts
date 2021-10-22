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

import { AddFileRequest } from '../models/add-file-request';
import { FileInfo } from '../models/file-info';

@Injectable({
	providedIn: 'root',
})
export class FileApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation addFile
	 */
	static readonly AddFilePath = '/file/add';

	/**
	 * Add a new file.
	 *
	 * The method attempts to add the new file.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `addFile()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	addFile$Response(params: { body: AddFileRequest }): Observable<StrictHttpResponse<string>> {
		const rb = new RequestBuilder(this.rootUrl, FileApiService.AddFilePath, 'post');
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
	 * Add a new file.
	 *
	 * The method attempts to add the new file.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `addFile$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	addFile(params: { body: AddFileRequest }): Observable<string> {
		return this.addFile$Response(params).pipe(map((r: StrictHttpResponse<string>) => r.body as string));
	}

	/**
	 * Path part for operation getFile
	 */
	static readonly GetFilePath = '/file/get';

	/**
	 * Returns the file by Id.
	 *
	 * The method attempts to get the file by id.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getFile()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getFile$Response(params: {
		/**
		 * File global unique identifier.
		 */
		fileId: string;
	}): Observable<StrictHttpResponse<Array<FileInfo>>> {
		const rb = new RequestBuilder(this.rootUrl, FileApiService.GetFilePath, 'get');
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
					return r as StrictHttpResponse<Array<FileInfo>>;
				})
			);
	}

	/**
	 * Returns the file by Id.
	 *
	 * The method attempts to get the file by id.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getFile$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getFile(params: {
		/**
		 * File global unique identifier.
		 */
		fileId: string;
	}): Observable<Array<FileInfo>> {
		return this.getFile$Response(params).pipe(
			map((r: StrictHttpResponse<Array<FileInfo>>) => r.body as Array<FileInfo>)
		);
	}

	/**
	 * Path part for operation disableFile
	 */
	static readonly DisableFilePath = '/file/disable';

	/**
	 * Disable the file by Id.
	 *
	 * The method attempts to disable file by id.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `disableFile()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	disableFile$Response(params: {
		/**
		 * File global unique identifier.
		 */
		fileId: string;
	}): Observable<StrictHttpResponse<void>> {
		const rb = new RequestBuilder(this.rootUrl, FileApiService.DisableFilePath, 'get');
		if (params) {
			rb.query('fileId', params.fileId, {});
		}

		return this.http
			.request(
				rb.build({
					responseType: 'text',
					accept: '*/*',
				})
			)
			.pipe(
				filter((r: any) => r instanceof HttpResponse),
				map((r: HttpResponse<any>) => {
					return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
				})
			);
	}

	/**
	 * Disable the file by Id.
	 *
	 * The method attempts to disable file by id.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `disableFile$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	disableFile(params: {
		/**
		 * File global unique identifier.
		 */
		fileId: string;
	}): Observable<void> {
		return this.disableFile$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
	}
}
