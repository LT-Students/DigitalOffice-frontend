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

import { CreateCertificateRequest } from '../models/create-certificate-request';
import { EditCertificateRequest } from '../models/edit-certificate-request';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
	providedIn: 'root',
})
export class CertificateApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createCertificate
	 */
	static readonly CreateCertificatePath = '/certificate/create';

	/**
	 * The method attempts to add the certificate.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createCertificate()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createCertificate$Response(params: {
		body: CreateCertificateRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, CertificateApiService.CreateCertificatePath, 'post');
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
	 * The method attempts to add the certificate.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createCertificate$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createCertificate(params: { body: CreateCertificateRequest }): Observable<OperationResultResponse> {
		return this.createCertificate$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation editCertificate
	 */
	static readonly EditCertificatePath = '/certificate/edit';

	/**
	 * Update certificate properties. The user must have the rights to edit certificate to other users - Add/Edit/Remove users.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editCertificate()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editCertificate$Response(params: {
		/**
		 * Specific certificate id
		 */
		certificateId: string;
		body?: EditCertificateRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, CertificateApiService.EditCertificatePath, 'patch');
		if (params) {
			rb.query('certificateId', params.certificateId, {});
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
	 * Update certificate properties. The user must have the rights to edit certificate to other users - Add/Edit/Remove users.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editCertificate$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editCertificate(params: {
		/**
		 * Specific certificate id
		 */
		certificateId: string;
		body?: EditCertificateRequest;
	}): Observable<OperationResultResponse> {
		return this.editCertificate$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation removeCertificate
	 */
	static readonly RemoveCertificatePath = '/certificate/remove';

	/**
	 * Remove the specified certificate by id.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `removeCertificate()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	removeCertificate$Response(params: {
		/**
		 * Specific certificate id
		 */
		certificateId: string;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, CertificateApiService.RemoveCertificatePath, 'delete');
		if (params) {
			rb.query('certificateId', params.certificateId, {});
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
	 * Remove the specified certificate by id.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `removeCertificate$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	removeCertificate(params: {
		/**
		 * Specific certificate id
		 */
		certificateId: string;
	}): Observable<OperationResultResponse> {
		return this.removeCertificate$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
