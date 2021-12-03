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

import { ChangePasswordRequest } from '../models/change-password-request';
import { OperationResultResponse } from '../models/operation-result-response';
import { ReconstructPasswordRequest } from '../models/reconstruct-password-request';

@Injectable({
	providedIn: 'root',
})
export class PasswordApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation generatePassword
	 */
	static readonly GeneratePasswordPath = '/password/generate';

	/**
	 * Returns randomly generated password.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `generatePassword()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	generatePassword$Response(params?: {}): Observable<StrictHttpResponse<string>> {
		const rb = new RequestBuilder(this.rootUrl, PasswordApiService.GeneratePasswordPath, 'get');
		if (params) {
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
	 * Returns randomly generated password.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `generatePassword$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	generatePassword(params?: {}): Observable<string> {
		return this.generatePassword$Response(params).pipe(map((r: StrictHttpResponse<string>) => r.body as string));
	}

	/**
	 * Path part for operation changePassword
	 */
	static readonly ChangePasswordPath = '/password/change';

	/**
	 * Change user password.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `changePassword()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	changePassword$Response(params?: {
		body?: ChangePasswordRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, PasswordApiService.ChangePasswordPath, 'post');
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
	 * Change user password.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `changePassword$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	changePassword(params?: { body?: ChangePasswordRequest }): Observable<OperationResultResponse> {
		return this.changePassword$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation reconstructPassword
	 */
	static readonly ReconstructPasswordPath = '/password/reconstruct';

	/**
	 * Change user password use secret from email.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `reconstructPassword()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	reconstructPassword$Response(params?: {
		body?: ReconstructPasswordRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, PasswordApiService.ReconstructPasswordPath, 'post');
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
	 * Change user password use secret from email.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `reconstructPassword$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	reconstructPassword(params?: { body?: ReconstructPasswordRequest }): Observable<OperationResultResponse> {
		return this.reconstructPassword$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation forgotPassword
	 */
	static readonly ForgotPasswordPath = '/password/forgot';

	/**
	 * Initiates sending a email with instructions on how to change the user's password.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `forgotPassword()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	forgotPassword$Response(params: { userEmail: string }): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, PasswordApiService.ForgotPasswordPath, 'get');
		if (params) {
			rb.query('userEmail', params.userEmail, {});
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
	 * Initiates sending a email with instructions on how to change the user's password.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `forgotPassword$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	forgotPassword(params: { userEmail: string }): Observable<OperationResultResponse> {
		return this.forgotPassword$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
