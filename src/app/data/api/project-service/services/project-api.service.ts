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
import { Project } from '../models/project';
import { ProjectExpandedRequest } from '../models/project-expanded-request';
import { ProjectExpandedResponse } from '../models/project-expanded-response';

@Injectable({
  providedIn: 'root',
})
export class ProjectApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getProjects
   */
  static readonly GetProjectsPath = '/project/getProjects';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProjects()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProjects$Response(params?: {}): Observable<
    StrictHttpResponse<Array<Project>>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProjectApiService.GetProjectsPath,
      'get'
    );
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
          return r as StrictHttpResponse<Array<Project>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProjects$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProjects(params?: {}): Observable<Array<Project>> {
    return this.getProjects$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Project>>) => r.body as Array<Project>)
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
    const rb = new RequestBuilder(
      this.rootUrl,
      ProjectApiService.GetProjectByIdPath,
      'get'
    );
    if (params) {
      rb.query('projectId', params.projectId, { style: 'form', explode: true });
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
      map(
        (r: StrictHttpResponse<ProjectExpandedResponse>) =>
          r.body as ProjectExpandedResponse
      )
    );
  }

  /**
   * Path part for operation createNewProject
   */
  static readonly CreateNewProjectPath = '/project/createNewProject';

  /**
   * Creating new project.
   * *  __The user must have access right__ -- Add/Edit/Remove projects.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createNewProject()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewProject$Response(params: {
    body: ProjectExpandedRequest;
  }): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProjectApiService.CreateNewProjectPath,
      'post'
    );
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
   * Creating new project.
   * *  __The user must have access right__ -- Add/Edit/Remove projects.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createNewProject$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewProject(params: {
    body: ProjectExpandedRequest;
  }): Observable<string> {
    return this.createNewProject$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation editProjectById
   */
  static readonly EditProjectByIdPath = '/project/editProjectById';

  /**
   * Editing specific project by Id.
   * *  __The user must have access right__ -- Add/Edit/Remove projects.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editProjectById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editProjectById$Response(params: {
    /**
     * Project global unique identifier.
     */
    projectId: string;
    body: EditProjectRequest;
  }): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ProjectApiService.EditProjectByIdPath,
      'post'
    );
    if (params) {
      rb.query('projectId', params.projectId, { style: 'form', explode: true });
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
   * Editing specific project by Id.
   * *  __The user must have access right__ -- Add/Edit/Remove projects.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editProjectById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editProjectById(params: {
    /**
     * Project global unique identifier.
     */
    projectId: string;
    body: EditProjectRequest;
  }): Observable<string> {
    return this.editProjectById$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }
}
