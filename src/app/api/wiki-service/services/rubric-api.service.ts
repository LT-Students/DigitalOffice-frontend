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

import { CreateRubricRequest } from '../models/create-rubric-request';
import { EditRubricRequest } from '../models/edit-rubric-request';

@Injectable({
	providedIn: 'root',
})
export class RubricApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createRubric
	 */
	static readonly CreateRubricPath = '/rubric/create';

	/**
	 * Creating new rubric. The user must have access right - Add/Edit/Remove Wiki.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createRubric()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createRubric$Response(params: { body: CreateRubricRequest }): Observable<StrictHttpResponse<string>> {
		const rb = new RequestBuilder(this.rootUrl, RubricApiService.CreateRubricPath, 'post');
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
	 * Creating new rubric. The user must have access right - Add/Edit/Remove Wiki.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createRubric$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createRubric(params: { body: CreateRubricRequest }): Observable<string> {
		return this.createRubric$Response(params).pipe(map((r: StrictHttpResponse<string>) => r.body as string));
	}

	/**
	 * Path part for operation editRubric
	 */
	static readonly EditRubricPath = '/rubric/edit';

	/**
	 * Editing specific rubric by Id. The user must have access right - Add/Edit/Remove Wiki.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editRubric()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editRubric$Response(params: {
		/**
		 * Rubric global unique identifier.
		 */
		ribricId: string;
		body: EditRubricRequest;
	}): Observable<StrictHttpResponse<boolean>> {
		const rb = new RequestBuilder(this.rootUrl, RubricApiService.EditRubricPath, 'patch');
		if (params) {
			rb.query('ribricId', params.ribricId, {});
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
					return (r as HttpResponse<any>).clone({
						body: String((r as HttpResponse<any>).body) === 'true',
					}) as StrictHttpResponse<boolean>;
				})
			);
	}

	/**
	 * Editing specific rubric by Id. The user must have access right - Add/Edit/Remove Wiki.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editRubric$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editRubric(params: {
		/**
		 * Rubric global unique identifier.
		 */
		ribricId: string;
		body: EditRubricRequest;
	}): Observable<boolean> {
		return this.editRubric$Response(params).pipe(map((r: StrictHttpResponse<boolean>) => r.body as boolean));
	}
}
