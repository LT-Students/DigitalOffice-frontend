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

import { CreateTaskPropertyRequest } from '../models/create-task-property-request';
import { EditTaskPropertyRequest } from '../models/edit-task-property-request';
import { FindResponseTaskProperty } from '../models/find-response-task-property';
import { OperationResultResponse } from '../models/operation-result-response';
import { PropertyType } from '../models/property-type';

@Injectable({
	providedIn: 'root',
})
export class TaskPropertyApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createTaskProperty
	 */
	static readonly CreateTaskPropertyPath = '/taskProperty/create';

	/**
	 * Creating new task property.
	 * *  __The user must have access right__ -- Add/Edit/Remove task property.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createTaskProperty()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createTaskProperty$Response(params: {
		body: CreateTaskPropertyRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, TaskPropertyApiService.CreateTaskPropertyPath, 'post');
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
	 * Creating new task property.
	 * *  __The user must have access right__ -- Add/Edit/Remove task property.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createTaskProperty$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createTaskProperty(params: { body: CreateTaskPropertyRequest }): Observable<OperationResultResponse> {
		return this.createTaskProperty$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation editTaskProperty
	 */
	static readonly EditTaskPropertyPath = '/taskProperty/edit';

	/**
	 * Edit task property.
	 * *  __The user must have access right__ -- be in a project.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editTaskProperty()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editTaskProperty$Response(params: {
		/**
		 * TaskProperty global unique identifier.
		 */
		taskPropertyId: string;
		body: EditTaskPropertyRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, TaskPropertyApiService.EditTaskPropertyPath, 'patch');
		if (params) {
			rb.query('taskPropertyId', params.taskPropertyId, {});
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
	 * Edit task property.
	 * *  __The user must have access right__ -- be in a project.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editTaskProperty$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editTaskProperty(params: {
		/**
		 * TaskProperty global unique identifier.
		 */
		taskPropertyId: string;
		body: EditTaskPropertyRequest;
	}): Observable<OperationResultResponse> {
		return this.editTaskProperty$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation findTaskProperties
	 */
	static readonly FindTaskPropertiesPath = '/taskProperty/find';

	/**
	 * Find specific task property by parameters: projectId, authorId, name.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findTaskProperties()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findTaskProperties$Response(params: {
		/**
		 * The part of find query that the task property name should contain.
		 */
		name?: string;

		/**
		 * The part of find query that the task property author Id should contain.
		 */
		authorid?: string;

		/**
		 * The part of find query that the task property projectid should contain.
		 */
		projectid?: string;

		/**
		 * The part of find query that the task property type should equal.
		 */
		type?: PropertyType;

		/**
		 * Number of entries to skip.
		 */
		skipCount: number;

		/**
		 * Number of task properties to take.
		 */
		takeCount: number;
	}): Observable<StrictHttpResponse<FindResponseTaskProperty>> {
		const rb = new RequestBuilder(this.rootUrl, TaskPropertyApiService.FindTaskPropertiesPath, 'get');
		if (params) {
			rb.query('name', params.name, {});
			rb.query('authorid', params.authorid, {});
			rb.query('projectid', params.projectid, {});
			rb.query('type', params.type, {});
			rb.query('skipCount', params.skipCount, {});
			rb.query('takeCount', params.takeCount, {});
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
					return r as StrictHttpResponse<FindResponseTaskProperty>;
				})
			);
	}

	/**
	 * Find specific task property by parameters: projectId, authorId, name.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findTaskProperties$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findTaskProperties(params: {
		/**
		 * The part of find query that the task property name should contain.
		 */
		name?: string;

		/**
		 * The part of find query that the task property author Id should contain.
		 */
		authorid?: string;

		/**
		 * The part of find query that the task property projectid should contain.
		 */
		projectid?: string;

		/**
		 * The part of find query that the task property type should equal.
		 */
		type?: PropertyType;

		/**
		 * Number of entries to skip.
		 */
		skipCount: number;

		/**
		 * Number of task properties to take.
		 */
		takeCount: number;
	}): Observable<FindResponseTaskProperty> {
		return this.findTaskProperties$Response(params).pipe(
			map((r: StrictHttpResponse<FindResponseTaskProperty>) => r.body as FindResponseTaskProperty)
		);
	}
}
