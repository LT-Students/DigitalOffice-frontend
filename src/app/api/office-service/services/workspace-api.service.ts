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

import { CreateWorkspaceRequest } from '../models/create-workspace-request';
import { CreateWorkspaceTypeRequest } from '../models/create-workspace-type-request';
import { FindResultResponseWorkspaceInfo } from '../models/find-result-response-workspace-info';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createWorkspace
   */
  static readonly CreateWorkspacePath = '/workspace/create';

  /**
   * Adds a new workspace.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createWorkspace()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createWorkspace$Response(params: {
    body: CreateWorkspaceRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, WorkspaceApiService.CreateWorkspacePath, 'post');
    if (params) {
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
   * Adds a new workspace.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createWorkspace$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createWorkspace(params: {
    body: CreateWorkspaceRequest
  }): Observable<OperationResultResponse> {

    return this.createWorkspace$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation findWorkspaces
   */
  static readonly FindWorkspacesPath = '/workspace/find';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findWorkspaces()` instead.
   *
   * This method doesn't expect any request body.
   */
  findWorkspaces$Response(params: {

    /**
     * Number of workspaces to skip.
     */
    skipCount: number;

    /**
     * Number of workspaces to take.
     */
    takeCount: number;

    /**
     * If it is true, response will be have deactivated records.
     */
    includeDeactivated?: boolean;
  }): Observable<StrictHttpResponse<FindResultResponseWorkspaceInfo>> {

    const rb = new RequestBuilder(this.rootUrl, WorkspaceApiService.FindWorkspacesPath, 'get');
    if (params) {
      rb.query('skipCount', params.skipCount, {});
      rb.query('takeCount', params.takeCount, {});
      rb.query('includeDeactivated', params.includeDeactivated, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FindResultResponseWorkspaceInfo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findWorkspaces$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findWorkspaces(params: {

    /**
     * Number of workspaces to skip.
     */
    skipCount: number;

    /**
     * Number of workspaces to take.
     */
    takeCount: number;

    /**
     * If it is true, response will be have deactivated records.
     */
    includeDeactivated?: boolean;
  }): Observable<FindResultResponseWorkspaceInfo> {

    return this.findWorkspaces$Response(params).pipe(
      map((r: StrictHttpResponse<FindResultResponseWorkspaceInfo>) => r.body as FindResultResponseWorkspaceInfo)
    );
  }

  /**
   * Path part for operation createWorkspaceType
   */
  static readonly CreateWorkspaceTypePath = '/workspacetype/create';

  /**
   * Adds a new workspace type.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createWorkspaceType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createWorkspaceType$Response(params: {
    body: CreateWorkspaceTypeRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, WorkspaceApiService.CreateWorkspaceTypePath, 'post');
    if (params) {
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
   * Adds a new workspace type.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createWorkspaceType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createWorkspaceType(params: {
    body: CreateWorkspaceTypeRequest
  }): Observable<OperationResultResponse> {

    return this.createWorkspaceType$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
