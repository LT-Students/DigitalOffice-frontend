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

import { CreateProjectRequest } from '../models/create-project-request';
import { EditProjectRequest } from '../models/edit-project-request';
import { FindResultResponseProjectInfo } from '../models/find-result-response-project-info';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseProjectResponse } from '../models/operation-result-response-project-response';
import { ProjectStatusType } from '../models/project-status-type';

@Injectable({
	providedIn: 'root',
})
export class ProjectApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation findProjects
	 */
	static readonly FindProjectsPath = '/project/find';

	/**
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findProjects()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findProjects$Response(params: {
		/**
		 * Sorting of the results
		 */
		isascendingsort?: boolean;

		/**
		 * Project type of the results
		 */
		projectstatus?: ProjectStatusType;

		/**
		 * Substring which results must contain
		 */
		nameincludesubstring?: string;

		/**
		 * Number of entries to skip
		 */
		skipCount: number;

		/**
		 * Number of projects to take.
		 */
		takeCount: number;

		/**
		 * Include project department info.
		 */
		includedepartment?: boolean;

		/**
		 * Return only projects with specified user
		 */
		userid?: string;
	}): Observable<StrictHttpResponse<FindResultResponseProjectInfo>> {
		const rb = new RequestBuilder(this.rootUrl, ProjectApiService.FindProjectsPath, 'get');
		if (params) {
			rb.query('isascendingsort', params.isascendingsort, {});
			rb.query('projectstatus', params.projectstatus, {});
			rb.query('nameincludesubstring', params.nameincludesubstring, {});
			rb.query('skipCount', params.skipCount, {});
			rb.query('takeCount', params.takeCount, {});
			rb.query('includedepartment', params.includedepartment, {});
			rb.query('userid', params.userid, {});
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
					return r as StrictHttpResponse<FindResultResponseProjectInfo>;
				})
			);
	}

	/**
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findProjects$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findProjects(params: {
		/**
		 * Sorting of the results
		 */
		isascendingsort?: boolean;

		/**
		 * Project type of the results
		 */
		projectstatus?: ProjectStatusType;

		/**
		 * Substring which results must contain
		 */
		nameincludesubstring?: string;

		/**
		 * Number of entries to skip
		 */
		skipCount: number;

		/**
		 * Number of projects to take.
		 */
		takeCount: number;

		/**
		 * Include project department info.
		 */
		includedepartment?: boolean;

		/**
		 * Return only projects with specified user
		 */
		userid?: string;
	}): Observable<FindResultResponseProjectInfo> {
		return this.findProjects$Response(params).pipe(
			map((r: StrictHttpResponse<FindResultResponseProjectInfo>) => r.body as FindResultResponseProjectInfo)
		);
	}

	/**
	 * Path part for operation getProject
	 */
	static readonly GetProjectPath = '/project/get';

	/**
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getProject()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getProject$Response(params: {
		/**
		 * Project global unique identifier.
		 */
		projectId: string;
		includefiles?: boolean;
		includeimages?: boolean;
	}): Observable<StrictHttpResponse<OperationResultResponseProjectResponse>> {
		const rb = new RequestBuilder(this.rootUrl, ProjectApiService.GetProjectPath, 'get');
		if (params) {
			rb.query('projectId', params.projectId, {});
			rb.query('includefiles', params.includefiles, {});
			rb.query('includeimages', params.includeimages, {});
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
					return r as StrictHttpResponse<OperationResultResponseProjectResponse>;
				})
			);
	}

	/**
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getProject$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getProject(params: {
		/**
		 * Project global unique identifier.
		 */
		projectId: string;
		includefiles?: boolean;
		includeimages?: boolean;
	}): Observable<OperationResultResponseProjectResponse> {
		return this.getProject$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseProjectResponse>) =>
					r.body as OperationResultResponseProjectResponse
			)
		);
	}

	/**
	 * Path part for operation createProject
	 */
	static readonly CreateProjectPath = '/project/create';

	/**
	 * Creating new project.
	 * *  __The user must have access right__ -- Add/Edit/Remove projects.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createProject()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createProject$Response(params: {
		body: CreateProjectRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, ProjectApiService.CreateProjectPath, 'post');
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
	 * Creating new project.
	 * *  __The user must have access right__ -- Add/Edit/Remove projects.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createProject$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createProject(params: { body: CreateProjectRequest }): Observable<OperationResultResponse> {
		return this.createProject$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation editProject
	 */
	static readonly EditProjectPath = '/project/edit';

	/**
	 * Editing specific project by Id.
	 * *  __The user must have been the department director.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editProject()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editProject$Response(params: {
		/**
		 * Project global unique identifier.
		 */
		projectId: string;
		body: EditProjectRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, ProjectApiService.EditProjectPath, 'patch');
		if (params) {
			rb.query('projectId', params.projectId, {});
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
	 * Editing specific project by Id.
	 * *  __The user must have been the department director.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editProject$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editProject(params: {
		/**
		 * Project global unique identifier.
		 */
		projectId: string;
		body: EditProjectRequest;
	}): Observable<OperationResultResponse> {
		return this.editProject$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}
}
