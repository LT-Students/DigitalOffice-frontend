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

import { AddUsersToProjectRequest } from '../models/add-users-to-project-request';
import { IRemoveUsersFromProjectRequest } from '@app/services/project/project.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation addUsersToProject
   */
  static readonly AddUsersToProjectPath = '/user/addUsersToProject';

  /**
   * Adding specific users to project.
   * *  __The user must have access right__ -- Add/Edit/Remove projects.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addUsersToProject()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addUsersToProject$Response(params: {
    body: AddUsersToProjectRequest
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.AddUsersToProjectPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Adding specific users to project.
   * *  __The user must have access right__ -- Add/Edit/Remove projects.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addUsersToProject$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addUsersToProject(params: {
    body: AddUsersToProjectRequest
  }): Observable<void> {

    return this.addUsersToProject$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeUsersFromProject
   */
  static readonly RemoveUsersFromProjectPath = '/user/removeUsersFromProject';

  /**
   * Remove specific users from specific project.
   * * __The user must have access right__ -- Add/Edit/Remove project.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeUsersFromProject()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeUsersFromProject$Response(params: {

    /**
     * Project global unique identifier.
     */
    projectId: string;
    userIds: any;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.RemoveUsersFromProjectPath, 'delete');
    if (params) {
      rb.query('projectId', params.projectId, {});
      rb.query('userIds', params.userIds, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Remove specific users from specific project.
   * * __The user must have access right__ -- Add/Edit/Remove project.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeUsersFromProject$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeUsersFromProject(params: IRemoveUsersFromProjectRequest): Observable<void> {

    return this.removeUsersFromProject$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
