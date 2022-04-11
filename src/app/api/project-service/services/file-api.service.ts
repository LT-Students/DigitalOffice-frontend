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

import { CreateFilesRequest } from '../models/create-files-request';
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
	 * Path part for operation createFile
	 */
	static readonly CreateFilePath = '/file/create';

	/**
	 * Add files to Project.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createFile()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createFile$Response(params: { body: CreateFilesRequest }): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, FileApiService.CreateFilePath, 'post');
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
	 * Add files to Project.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createFile$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createFile(params: { body: CreateFilesRequest }): Observable<OperationResultResponse> {
		return this.createFile$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
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
}
