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

import { AddDepartmentUsersRequest } from '../models/add-department-users-request';
import { CreateCompanyRequest } from '../models/create-company-request';
import { EditCompanyRequest } from '../models/edit-company-request';
import { FindResultResponseOfficeInfo } from '../models/find-result-response-office-info';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseCompanyInfo } from '../models/operation-result-response-company-info';

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
	static readonly CreateCompanyPath = '/company/create';

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
	static readonly GetCompanyPath = '/company/get';

	/**
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getCompany()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getCompany$Response(params?: {
		/**
		 * Include departments info in answer.
		 */
		includedepartments?: boolean;

		/**
		 * Include positions info in answer.
		 */
		includepositions?: boolean;

		/**
		 * Include offices info in answer.
		 */
		includeoffices?: boolean;

		/**
		 * Include smtp credentials in answer.
		 */
		includesmtpcredentials?: boolean;
	}): Observable<StrictHttpResponse<OperationResultResponseCompanyInfo>> {
		const rb = new RequestBuilder(this.rootUrl, CompanyApiService.GetCompanyPath, 'get');
		if (params) {
			rb.query('includedepartments', params.includedepartments, {});
			rb.query('includepositions', params.includepositions, {});
			rb.query('includeoffices', params.includeoffices, {});
			rb.query('includesmtpcredentials', params.includesmtpcredentials, {});
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
					return r as StrictHttpResponse<OperationResultResponseCompanyInfo>;
				})
			);
	}

	/**
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getCompany$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getCompany(params?: {
		/**
		 * Include departments info in answer.
		 */
		includedepartments?: boolean;

		/**
		 * Include positions info in answer.
		 */
		includepositions?: boolean;

		/**
		 * Include offices info in answer.
		 */
		includeoffices?: boolean;

		/**
		 * Include smtp credentials in answer.
		 */
		includesmtpcredentials?: boolean;
	}): Observable<OperationResultResponseCompanyInfo> {
		return this.getCompany$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseCompanyInfo>) =>
					r.body as OperationResultResponseCompanyInfo
			)
		);
	}

	/**
	 * Path part for operation editCompany
	 */
	static readonly EditCompanyPath = '/company/edit';

	/**
	 * update Company properties.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editCompany()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editCompany$Response(params?: {
		body?: EditCompanyRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, CompanyApiService.EditCompanyPath, 'patch');
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
	 * update Company properties.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editCompany$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editCompany(params?: { body?: EditCompanyRequest }): Observable<OperationResultResponse> {
		return this.editCompany$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation findOffices
	 */
	static readonly FindOfficesPath = '/office/find';

	/**
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findOffices()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findOffices$Response(params: {
		/**
		 * Number of offices to skip.
		 */
		skipCount: number;

		/**
		 * Number of offices to take.
		 */
		takeCount: number;

		/**
		 * If it is true, response will be have deactivated records.
		 */
		includeDeactivated?: boolean;
	}): Observable<StrictHttpResponse<FindResultResponseOfficeInfo>> {
		const rb = new RequestBuilder(this.rootUrl, CompanyApiService.FindOfficesPath, 'get');
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
					return r as StrictHttpResponse<FindResultResponseOfficeInfo>;
				})
			);
	}

	/**
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findOffices$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findOffices(params: {
		/**
		 * Number of offices to skip.
		 */
		skipCount: number;

		/**
		 * Number of offices to take.
		 */
		takeCount: number;

		/**
		 * If it is true, response will be have deactivated records.
		 */
		includeDeactivated?: boolean;
	}): Observable<FindResultResponseOfficeInfo> {
		return this.findOffices$Response(params).pipe(
			map((r: StrictHttpResponse<FindResultResponseOfficeInfo>) => r.body as FindResultResponseOfficeInfo)
		);
	}

	/**
	 * Path part for operation addDepartmentUsers
	 */
	static readonly AddDepartmentUsersPath = '/users/create';

	/**
	 * Adds a new users to department.
	 * * __The user must have access to the right__ -- Add/Edit/Remove departments.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `addDepartmentUsers()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	addDepartmentUsers$Response(params: {
		body: AddDepartmentUsersRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, CompanyApiService.AddDepartmentUsersPath, 'post');
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
	 * Adds a new users to department.
	 * * __The user must have access to the right__ -- Add/Edit/Remove departments.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `addDepartmentUsers$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	addDepartmentUsers(params: { body: AddDepartmentUsersRequest }): Observable<OperationResultResponse> {
		return this.addDepartmentUsers$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
