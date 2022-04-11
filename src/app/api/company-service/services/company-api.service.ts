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

import { CreateCompanyRequest } from '../models/create-company-request';
import { EditCompanyRequest } from '../models/edit-company-request';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseCompanyResponse } from '../models/operation-result-response-company-response';

@Injectable({
	providedIn: 'root',
})
export class CompanyApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createCompany
	 */
	static readonly CreateCompanyPath = '/company';

	/**
	 * Adds a new company.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createCompany()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createCompany$Response(params: {
		body: CreateCompanyRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, CompanyApiService.CreateCompanyPath, 'post');
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
	 * Adds a new company.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createCompany$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createCompany(params: { body: CreateCompanyRequest }): Observable<OperationResultResponse> {
		return this.createCompany$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation getCompany
	 */
	static readonly GetCompanyPath = '/company/{companyId}';

	/**
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getCompany()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getCompany$Response(params: {
		/**
		 * Unique company identifier.
		 */
		companyId: string;

		/**
		 * Include offices info in answer.
		 */
		includeoffices?: boolean;
	}): Observable<StrictHttpResponse<OperationResultResponseCompanyResponse>> {
		const rb = new RequestBuilder(this.rootUrl, CompanyApiService.GetCompanyPath, 'get');
		if (params) {
			rb.path('companyId', params.companyId, {});
			rb.query('includeoffices', params.includeoffices, {});
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
					return r as StrictHttpResponse<OperationResultResponseCompanyResponse>;
				})
			);
	}

	/**
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getCompany$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getCompany(params: {
		/**
		 * Unique company identifier.
		 */
		companyId: string;

		/**
		 * Include offices info in answer.
		 */
		includeoffices?: boolean;
	}): Observable<OperationResultResponseCompanyResponse> {
		return this.getCompany$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseCompanyResponse>) =>
					r.body as OperationResultResponseCompanyResponse
			)
		);
	}

	/**
	 * Path part for operation editCompany
	 */
	static readonly EditCompanyPath = '/company/{companyId}';

	/**
	 * update Company properties.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editCompany()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editCompany$Response(params: {
		/**
		 * Unique company identifier.
		 */
		companyId: string;
		body?: EditCompanyRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, CompanyApiService.EditCompanyPath, 'patch');
		if (params) {
			rb.path('companyId', params.companyId, {});
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
	 * update Company properties.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editCompany$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editCompany(params: {
		/**
		 * Unique company identifier.
		 */
		companyId: string;
		body?: EditCompanyRequest;
	}): Observable<OperationResultResponse> {
		return this.editCompany$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
