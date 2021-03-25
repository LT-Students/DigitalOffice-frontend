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

import { User } from '../models/user';
import { UserRequest } from '../models/user-request';

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
   * Path part for operation getUserById
   */
  static readonly GetUserByIdPath = '/getUserById';

  /**
   * Returns user information by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: {

    /**
     * User global unique identifier.
     */
    userId: string;
  }): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.GetUserByIdPath, 'get');
    if (params) {
      rb.query('userId', params.userId, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<User>;
      })
    );
  }

  /**
   * Returns user information by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: {

    /**
     * User global unique identifier.
     */
    userId: string;
  }): Observable<User> {

    return this.getUserById$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Path part for operation getUsersByIds
   */
  static readonly GetUsersByIdsPath = '/getUsersByIds';

  /**
   * Returns users information by ids.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsersByIds()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsersByIds$Response(params: {

    /**
     * List of users global unique identifiers.
     */
    usersIds: Array<string>;
  }): Observable<StrictHttpResponse<Array<User>>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.GetUsersByIdsPath, 'get');
    if (params) {
      rb.query('usersIds', params.usersIds, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<User>>;
      })
    );
  }

  /**
   * Returns users information by ids.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUsersByIds$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsersByIds(params: {

    /**
     * List of users global unique identifiers.
     */
    usersIds: Array<string>;
  }): Observable<Array<User>> {

    return this.getUsersByIds$Response(params).pipe(
      map((r: StrictHttpResponse<Array<User>>) => r.body as Array<User>)
    );
  }

  /**
   * Path part for operation getAllUsers
   */
  static readonly GetAllUsersPath = '/getAllUsers';

  /**
   * Returns all users information with pagination and filter by full name.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Response(params: {

    /**
     * Number of pages to skip.
     */
    skipCount: number;

    /**
     * Number of users on one page.
     */
    takeCount: number;

    /**
     * User full name or its part that is wanted to be found.
     */
    userNameFilter?: string;
  }): Observable<StrictHttpResponse<Array<User>>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.GetAllUsersPath, 'get');
    if (params) {
      rb.query('skipCount', params.skipCount, {"style":"form","explode":true});
      rb.query('takeCount', params.takeCount, {"style":"form","explode":true});
      rb.query('userNameFilter', params.userNameFilter, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<User>>;
      })
    );
  }

  /**
   * Returns all users information with pagination and filter by full name.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers(params: {

    /**
     * Number of pages to skip.
     */
    skipCount: number;

    /**
     * Number of users on one page.
     */
    takeCount: number;

    /**
     * User full name or its part that is wanted to be found.
     */
    userNameFilter?: string;
  }): Observable<Array<User>> {

    return this.getAllUsers$Response(params).pipe(
      map((r: StrictHttpResponse<Array<User>>) => r.body as Array<User>)
    );
  }

  /**
   * Path part for operation getUserByEmail
   */
  static readonly GetUserByEmailPath = '/getUserByEmail';

  /**
   * Returns user information by email.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserByEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserByEmail$Response(params: {

    /**
     * User global unique identifier.
     */
    userEmail: string;
  }): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.GetUserByEmailPath, 'get');
    if (params) {
      rb.query('userEmail', params.userEmail, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<User>;
      })
    );
  }

  /**
   * Returns user information by email.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUserByEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserByEmail(params: {

    /**
     * User global unique identifier.
     */
    userEmail: string;
  }): Observable<User> {

    return this.getUserByEmail$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Path part for operation generatePassword
   */
  static readonly GeneratePasswordPath = '/generatePassword';

  /**
   * Returns randomly generated password.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `generatePassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  generatePassword$Response(params?: {
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.GeneratePasswordPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * Returns randomly generated password.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `generatePassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  generatePassword(params?: {
  }): Observable<string> {

    return this.generatePassword$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation createUser
   */
  static readonly CreateUserPath = '/createUser';

  /**
   * The method attempts to add the user. 
   *   * __The user must have accsess right__ -- Add/Edit/Remove users.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser$Response(params: {
    body: UserRequest
  }): Observable<StrictHttpResponse<string>> {

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
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * The method attempts to add the user. 
   *   * __The user must have accsess right__ -- Add/Edit/Remove users.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser(params: {
    body: UserRequest
  }): Observable<string> {

    return this.createUser$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation editUser
   */
  static readonly EditUserPath = '/editUser';

  /**
   * Updates user fields.
   * * __The user must have accsess right__ -- Add/Edit/Remove users.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editUser$Response(params: {

    /**
     * The User to put.
     */
    body: UserRequest
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.EditUserPath, 'post');
    if (params) {
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
   * Updates user fields.
   * * __The user must have accsess right__ -- Add/Edit/Remove users.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editUser(params: {

    /**
     * The User to put.
     */
    body: UserRequest
  }): Observable<boolean> {

    return this.editUser$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation disableUserById
   */
  static readonly DisableUserByIdPath = '/disableUserById';

  /**
   * Deletes the specified user by id.
   * * __The user must have accsess right__ -- Add/Edit/Remove users.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disableUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableUserById$Response(params: {

    /**
     * User global unique identifier.
     */
    userId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserApiService.DisableUserByIdPath, 'delete');
    if (params) {
      rb.query('userId', params.userId, {"style":"form","explode":true});
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
   * Deletes the specified user by id.
   * * __The user must have accsess right__ -- Add/Edit/Remove users.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `disableUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableUserById(params: {

    /**
     * User global unique identifier.
     */
    userId: string;
  }): Observable<void> {

    return this.disableUserById$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
