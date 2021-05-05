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
import { ProjectExpandedResponse } from '../models/project-expanded-response';
import { ProjectInfo } from '../models/project-info';
import { ProjectRequest } from '../models/project-request';
import { ProjectsResponse } from '../models/projects-response';

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
   * Path part for operation findprojects
   */
  static readonly FindprojectsPath = '/project/find';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findprojects()` instead.
   *
   * This method doesn't expect any request body.
   */
  findprojects$Response(params: {

    /**
     * The part that the project name should contain.
     */
    name?: string;

    /**
     * The part that the project shortname should contain.
     */
    shortname?: string;

    /**
     * The part that should be contained in the name of the department to which the project belongs.
     */
    departmentname?: string;

    /**
     * Number of pages to skip.
     */
    skipCount: number;

    /**
     * Number of users on one page.
     */
    takeCount: number;
  }): Observable<StrictHttpResponse<ProjectsResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectApiService.FindprojectsPath, 'get');
    if (params) {
      rb.query('name', params.name, {});
      rb.query('shortname', params.shortname, {});
      rb.query('departmentname', params.departmentname, {});
      rb.query('skipCount', params.skipCount, {});
      rb.query('takeCount', params.takeCount, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProjectsResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findprojects$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findprojects(params: {

    /**
     * The part that the project name should contain.
     */
    name?: string;

    /**
     * The part that the project shortname should contain.
     */
    shortname?: string;

    /**
     * The part that should be contained in the name of the department to which the project belongs.
     */
    departmentname?: string;

    /**
     * Number of pages to skip.
     */
    skipCount: number;

    /**
     * Number of users on one page.
     */
    takeCount: number;
  }): Observable<ProjectsResponse> {

    return this.findprojects$Response(params).pipe(
      map((r: StrictHttpResponse<ProjectsResponse>) => r.body as ProjectsResponse)
    );
  }

  /**
   * Path part for operation getProjectById
   */
  static readonly GetProjectByIdPath = '/project/getProjectById';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProjectById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProjectById$Response(params: {

    /**
     * Project global unique identifier.
     */
    projectId: string;
  }): Observable<StrictHttpResponse<ProjectExpandedResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectApiService.GetProjectByIdPath, 'get');
    if (params) {
      rb.query('projectId', params.projectId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProjectExpandedResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProjectById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProjectById(params: {

    /**
     * Project global unique identifier.
     */
    projectId: string;
  }): Observable<ProjectExpandedResponse> {

    return this.getProjectById$Response(params).pipe(
      map((r: StrictHttpResponse<ProjectExpandedResponse>) => r.body as ProjectExpandedResponse)
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
  }): Observable<StrictHttpResponse<ProjectInfo>> {

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
        return r as StrictHttpResponse<ProjectInfo>;
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
  }): Observable<ProjectInfo> {

    return this.createProject$Response(params).pipe(
      map((r: StrictHttpResponse<ProjectInfo>) => r.body as ProjectInfo)
    );
  }

  /**
   * Path part for operation editProject
   */
  static readonly EditProjectPath = '/project/edit';

  /**
   * Editing specific project by Id.
   * *  __The user must have access right__ -- Add/Edit/Remove projects.
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
    body: Array<EditProjectRequest>
  }): Observable<StrictHttpResponse<boolean>> {

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
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * Editing specific project by Id.
   * *  __The user must have access right__ -- Add/Edit/Remove projects.
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
    body: Array<EditProjectRequest>
  }): Observable<boolean> {

    return this.editProject$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

}
