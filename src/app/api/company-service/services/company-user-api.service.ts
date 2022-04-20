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

import { CreateCompanyUserRequest } from '../models/create-company-user-request';
import { EditCompanyUserRequest } from '../models/edit-company-user-request';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
  providedIn: 'root',
})
export class CompanyUserApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createCompanyUser
   */
  static readonly CreateCompanyUserPath = '/companyuser';

  /**
   * Create company user information.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCompanyUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCompanyUser$Response(params?: {
    body?: CreateCompanyUserRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyUserApiService.CreateCompanyUserPath, 'post');
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
   * Create company user information.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createCompanyUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCompanyUser(params?: {
    body?: CreateCompanyUserRequest
  }): Observable<OperationResultResponse> {

    return this.createCompanyUser$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation editCompanyUser
   */
  static readonly EditCompanyUserPath = '/companyuser/{userId}';

  /**
   * Chage company user information.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editCompanyUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editCompanyUser$Response(params: {

    /**
     * Unique user identifier.
     */
    userId: string;
    body?: EditCompanyUserRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyUserApiService.EditCompanyUserPath, 'patch');
    if (params) {
      rb.path('userId', params.userId, {});
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
   * Chage company user information.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editCompanyUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editCompanyUser(params: {

    /**
     * Unique user identifier.
     */
    userId: string;
    body?: EditCompanyUserRequest
  }): Observable<OperationResultResponse> {

    return this.editCompanyUser$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
