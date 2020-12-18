/**
 * UserService
 * UserService is an API that intended to work with users, user credentials and achievements.
 *
 * OpenAPI spec version: 1.0.5
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */ /* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { User } from '../model/user';
import { UserRequest } from '../model/userRequest';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class UserService {
  protected basePath = 'https://localhost:9801/api/user';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }

  /**
   *
   * The method attempts to add the user.
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createUserPost(
    body: UserRequest,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<string>;
  public createUserPost(
    body: UserRequest,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<string>>;
  public createUserPost(
    body: UserRequest,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<string>>;
  public createUserPost(
    body: UserRequest,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (body === null || body === undefined) {
      throw new Error(
        'Required parameter body was null or undefined when calling createUserPost.'
      );
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected:
      | string
      | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<string>(
      'post',
      `${this.basePath}/createUser`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   *
   * Deletes the specified user by id.
   * @param userId User global unique identifier.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public disableUserByIdDelete(
    userId: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<any>;
  public disableUserByIdDelete(
    userId: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public disableUserByIdDelete(
    userId: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public disableUserByIdDelete(
    userId: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error(
        'Required parameter userId was null or undefined when calling disableUserByIdDelete.'
      );
    }

    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    if (userId !== undefined && userId !== null) {
      queryParameters = queryParameters.set('userId', <any>userId);
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<any>(
      'delete',
      `${this.basePath}/disableUserById`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   *
   * Updates user fields.
   * @param body The User to put.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public editUserPost(
    body: UserRequest,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public editUserPost(
    body: UserRequest,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public editUserPost(
    body: UserRequest,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public editUserPost(
    body: UserRequest,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (body === null || body === undefined) {
      throw new Error(
        'Required parameter body was null or undefined when calling editUserPost.'
      );
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected:
      | string
      | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<boolean>(
      'post',
      `${this.basePath}/editUser`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   *
   * Returns all users information with pagination and filter by full name.
   * @param skipCount Number of pages to skip.
   * @param takeCount Number of users on one page.
   * @param userNameFilter User full name or its part that is wanted to be found.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAllUsersGet(
    skipCount: number,
    takeCount: number,
    userNameFilter?: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<User[]>;
  public getAllUsersGet(
    skipCount: number,
    takeCount: number,
    userNameFilter?: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<User>>;
  public getAllUsersGet(
    skipCount: number,
    takeCount: number,
    userNameFilter?: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<User>>;
  public getAllUsersGet(
    skipCount: number,
    takeCount: number,
    userNameFilter?: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (skipCount === null || skipCount === undefined) {
      throw new Error(
        'Required parameter skipCount was null or undefined when calling getAllUsersGet.'
      );
    }

    if (takeCount === null || takeCount === undefined) {
      throw new Error(
        'Required parameter takeCount was null or undefined when calling getAllUsersGet.'
      );
    }

    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    if (skipCount !== undefined && skipCount !== null) {
      queryParameters = queryParameters.set('skipCount', <any>skipCount);
    }
    if (takeCount !== undefined && takeCount !== null) {
      queryParameters = queryParameters.set('takeCount', <any>takeCount);
    }
    if (userNameFilter !== undefined && userNameFilter !== null) {
      queryParameters = queryParameters.set(
        'userNameFilter',
        <any>userNameFilter
      );
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<User>(
      'get',
      `${this.basePath}/getAllUsers`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   *
   * Returns user information by email.
   * @param userEmail User global unique identifier.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getUserByEmailGet(
    userEmail: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<User>;
  public getUserByEmailGet(
    userEmail: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<User>>;
  public getUserByEmailGet(
    userEmail: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<User>>;
  public getUserByEmailGet(
    userEmail: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (userEmail === null || userEmail === undefined) {
      throw new Error(
        'Required parameter userEmail was null or undefined when calling getUserByEmailGet.'
      );
    }

    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    if (userEmail !== undefined && userEmail !== null) {
      queryParameters = queryParameters.set('userEmail', <any>userEmail);
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<User>(
      'get',
      `${this.basePath}/getUserByEmail`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   *
   * Returns user information by id.
   * @param userId User global unique identifier.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getUserByIdGet(
    userId: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<User>;
  public getUserByIdGet(
    userId: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<User>>;
  public getUserByIdGet(
    userId: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<User>>;
  public getUserByIdGet(
    userId: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error(
        'Required parameter userId was null or undefined when calling getUserByIdGet.'
      );
    }

    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    if (userId !== undefined && userId !== null) {
      queryParameters = queryParameters.set('userId', <any>userId);
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<User>(
      'get',
      `${this.basePath}/getUserById`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   *
   * Returns users information by ids.
   * @param usersIds List of users global unique identifiers.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getUsersByIdsGet(
    usersIds: Array<string>,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<User>;
  public getUsersByIdsGet(
    usersIds: Array<string>,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<User>>;
  public getUsersByIdsGet(
    usersIds: Array<string>,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<User>>;
  public getUsersByIdsGet(
    usersIds: Array<string>,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (usersIds === null || usersIds === undefined) {
      throw new Error(
        'Required parameter usersIds was null or undefined when calling getUsersByIdsGet.'
      );
    }

    let queryParameters = new HttpParams({
      encoder: new CustomHttpUrlEncodingCodec(),
    });
    if (usersIds) {
      usersIds.forEach((element) => {
        queryParameters = queryParameters.append('usersIds', <any>element);
      });
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<User>(
      'get',
      `${this.basePath}/getUsersByIds`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }
}
