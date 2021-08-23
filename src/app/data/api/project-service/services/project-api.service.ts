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

import { EditProjectRequest } from '../models/edit-project-request';
import { FindResponseProjectInfo } from '../models/find-response-project-info';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseProjectInfo } from '../models/operation-result-response-project-info';
import { ProjectRequest } from '../models/project-request';
import { ProjectResponse } from '../models/project-response';

@Injectable({
  providedIn: 'root',
})
export class ProjectApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
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
     * Find project with this departments id.
     */
    departmentid?: string;

    /**
     * Number of entries to skip
     */
    skipCount: number;

    /**
     * Number of projects to take.
     */
    takeCount: number;
  }): Observable<StrictHttpResponse<FindResponseProjectInfo>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectApiService.FindProjectsPath, 'get');
    if (params) {
      rb.query('departmentid', params.departmentid, {});
      rb.query('skipCount', params.skipCount, {});
      rb.query('takeCount', params.takeCount, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FindResponseProjectInfo>;
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
     * Find project with this departments id.
     */
    departmentid?: string;

    /**
     * Number of entries to skip
     */
    skipCount: number;

    /**
     * Number of projects to take.
     */
    takeCount: number;
  }): Observable<FindResponseProjectInfo> {

    return this.findProjects$Response(params).pipe(
      map((r: StrictHttpResponse<FindResponseProjectInfo>) => r.body as FindResponseProjectInfo)
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
    includeusers?: boolean;
    shownotactiveusers?: boolean;
    includefiles?: boolean;
  }): Observable<StrictHttpResponse<ProjectResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectApiService.GetProjectPath, 'get');
    if (params) {
      rb.query('projectId', params.projectId, {});
      rb.query('includeusers', params.includeusers, {});
      rb.query('shownotactiveusers', params.shownotactiveusers, {});
      rb.query('includefiles', params.includefiles, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProjectResponse>;
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
    includeusers?: boolean;
    shownotactiveusers?: boolean;
    includefiles?: boolean;
  }): Observable<ProjectResponse> {

    return this.getProject$Response(params).pipe(
      map((r: StrictHttpResponse<ProjectResponse>) => r.body as ProjectResponse)
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
    body: ProjectRequest
  }): Observable<StrictHttpResponse<OperationResultResponseProjectInfo>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectApiService.CreateProjectPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OperationResultResponseProjectInfo>;
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
  createProject(params: {
    body: ProjectRequest
  }): Observable<OperationResultResponseProjectInfo> {

    return this.createProject$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponseProjectInfo>) => r.body as OperationResultResponseProjectInfo)
    );
  }

  /**
   * Path part for operation editProject
   */
  static readonly EditProjectPath = '/project/edit';

  /**
   * Editing specific project by Id.
   * *  __The user must have been the department director projects.
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
    body: EditProjectRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectApiService.EditProjectPath, 'patch');
    if (params) {
      rb.query('projectId', params.projectId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OperationResultResponse>;
      })
    );
  }

  /**
   * Editing specific project by Id.
   * *  __The user must have been the department director projects.
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
    body: EditProjectRequest
  }): Observable<OperationResultResponse> {

    return this.editProject$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
