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

import { CreateUserRequest } from '../models/create-user-request';
import { EditUserRequest } from '../models/edit-user-request';
import { OperationResultResponse } from '../models/operation-result-response';
import { UserResponse } from '../models/user-response';
import { UsersResponse } from '../models/users-response';

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
   * Path part for operation getUser
   */
  static readonly GetUserPath = '/users/get';

  /**
   * Returns user information.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUser$Response(params?: {

    /**
     * User global unique identifier.
     */
    userId?: string;

    /**
     * User first or last name.
     */
    name?: string;

    /**
     * Any of user emails. Can not be used with &#x60;includecommunications&#x60;.
     */
    email?: string;

    /**
     * Include user communications info in answer.
     */
    includecommunications?: boolean;

    /**
     * Include user certificates info in answer.
     */
    includecertificates?: boolean;

    /**
     * Include user achievements info in answer.
     */
    includeachievements?: boolean;

    /**
     * Include user department info in answer.
     */
    includedepartment?: boolean;

    /**
     * Include user position info in answer.
     */
    includeposition?: boolean;

    /**
     * Include user skills info in answer.
     */
    includeskills?: boolean;

    /**
     * Include user projects info in answer.
     */
    includeprojects?: boolean;

    /**
     * Include images content in answer.
     */
    includeimages?: boolean;

    /**
     * Include educations info in answer.
     */
    includeeducations?: boolean;
  }): Observable<StrictHttpResponse<UserResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.GetUserPath, 'get');
    if (params) {
      rb.query('userId', params.userId, {});
      rb.query('name', params.name, {});
      rb.query('email', params.email, {});
      rb.query('includecommunications', params.includecommunications, {});
      rb.query('includecertificates', params.includecertificates, {});
      rb.query('includeachievements', params.includeachievements, {});
      rb.query('includedepartment', params.includedepartment, {});
      rb.query('includeposition', params.includeposition, {});
      rb.query('includeskills', params.includeskills, {});
      rb.query('includeprojects', params.includeprojects, {});
      rb.query('includeimages', params.includeimages, {});
      rb.query('includeeducations', params.includeeducations, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserResponse>;
      })
    );
  }

  /**
   * Returns user information.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUser(params?: {

    /**
     * User global unique identifier.
     */
    userId?: string;

    /**
     * User first or last name.
     */
    name?: string;

    /**
     * Any of user emails. Can not be used with &#x60;includecommunications&#x60;.
     */
    email?: string;

    /**
     * Include user communications info in answer.
     */
    includecommunications?: boolean;

    /**
     * Include user certificates info in answer.
     */
    includecertificates?: boolean;

    /**
     * Include user achievements info in answer.
     */
    includeachievements?: boolean;

    /**
     * Include user department info in answer.
     */
    includedepartment?: boolean;

    /**
     * Include user position info in answer.
     */
    includeposition?: boolean;

    /**
     * Include user skills info in answer.
     */
    includeskills?: boolean;

    /**
     * Include user projects info in answer.
     */
    includeprojects?: boolean;

    /**
     * Include images content in answer.
     */
    includeimages?: boolean;

    /**
     * Include educations info in answer.
     */
    includeeducations?: boolean;
  }): Observable<UserResponse> {

    return this.getUser$Response(params).pipe(
      map((r: StrictHttpResponse<UserResponse>) => r.body as UserResponse)
    );
  }

  /**
   * Path part for operation findUsers
   */
  static readonly FindUsersPath = '/users/find';

  /**
   * Returns all users information with pagination.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUsers$Response(params: {

    /**
     * Specific department of users.
     */
    departmentid?: string;

    /**
     * Number of pages to skip.
     */
    skipCount: number;

    /**
     * Number of users on one page.
     */
    takeCount: number;
  }): Observable<StrictHttpResponse<UsersResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.FindUsersPath, 'get');
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
        return r as StrictHttpResponse<UsersResponse>;
      })
    );
  }

  /**
   * Returns all users information with pagination.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUsers(params: {

    /**
     * Specific department of users.
     */
    departmentid?: string;

    /**
     * Number of pages to skip.
     */
    skipCount: number;

    /**
     * Number of users on one page.
     */
    takeCount: number;
  }): Observable<UsersResponse> {

    return this.findUsers$Response(params).pipe(
      map((r: StrictHttpResponse<UsersResponse>) => r.body as UsersResponse)
    );
  }

  /**
   * Path part for operation createUser
   */
  static readonly CreateUserPath = '/users/create';

  /**
   * The method attempts to add the user. The user must have right - Add/Edit/Remove users.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser$Response(params: {
    body: CreateUserRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.CreateUserPath, 'post');
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
   * The method attempts to add the user. The user must have right - Add/Edit/Remove users.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser(params: {
    body: CreateUserRequest
  }): Observable<OperationResultResponse> {

    return this.createUser$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation editUser
   */
  static readonly EditUserPath = '/users/edit';

  /**
   * Update user properties. The user must have right - Add/Edit/Remove users.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editUser$Response(params: {

    /**
     * Specific user id
     */
    userId: string;
    body?: EditUserRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.EditUserPath, 'patch');
    if (params) {
      rb.query('userId', params.userId, {});
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
   * Update user properties. The user must have right - Add/Edit/Remove users.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editUser(params: {

    /**
     * Specific user id
     */
    userId: string;
    body?: EditUserRequest
  }): Observable<OperationResultResponse> {

    return this.editUser$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation disableUser
   */
  static readonly DisableUserPath = '/users/disable';

  /**
   * Delete the specified user by id. The user must have right - Add/Edit/Remove users.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disableUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableUser$Response(params: {

    /**
     * User global unique identifier.
     */
    userId: string;
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.DisableUserPath, 'delete');
    if (params) {
      rb.query('userId', params.userId, {});
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
   * Delete the specified user by id. The user must have right - Add/Edit/Remove users.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `disableUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableUser(params: {

    /**
     * User global unique identifier.
     */
    userId: string;
  }): Observable<OperationResultResponse> {

    return this.disableUser$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
