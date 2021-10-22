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

import { CreateSkillRequest } from '../models/create-skill-request';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
	providedIn: 'root',
})
export class SkillApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createSkill
	 */
	static readonly CreateSkillPath = '/skill/create';

	/**
	 * The method attempts to add skill. The sender must have the rights 'Add/Edit/Remove users' or must be an admin to create skill.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createSkill()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createSkill$Response(params: {
		body: CreateSkillRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, SkillApiService.CreateSkillPath, 'post');
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
	 * The method attempts to add skill. The sender must have the rights 'Add/Edit/Remove users' or must be an admin to create skill.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createSkill$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createSkill(params: { body: CreateSkillRequest }): Observable<OperationResultResponse> {
		return this.createSkill$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
