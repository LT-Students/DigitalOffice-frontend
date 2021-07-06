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

import { CreateCompanyRequest } from '../models/create-company-request';
import { FindOfficesResponse } from '../models/find-offices-response';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseCompanyInfo } from '../models/operation-result-response-company-info';

@Injectable({
  providedIn: 'root',
})
export class CompanyApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createCompany
   */
  static readonly CreateCompanyPath = '/company/create';

  /**
   * Adds a new company.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCompany()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCompany$Response(params: {
    body: CreateCompanyRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyApiService.CreateCompanyPath, 'post');
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
   * Adds a new company.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createCompany$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCompany(params: {
    body: CreateCompanyRequest
  }): Observable<OperationResultResponse> {

    return this.createCompany$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation getCompany
   */
  static readonly GetCompanyPath = '/company/get';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCompany()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCompany$Response(params?: {
  }): Observable<StrictHttpResponse<OperationResultResponseCompanyInfo>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyApiService.GetCompanyPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OperationResultResponseCompanyInfo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCompany$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCompany(params?: {
  }): Observable<OperationResultResponseCompanyInfo> {

    return this.getCompany$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponseCompanyInfo>) => r.body as OperationResultResponseCompanyInfo)
    );
  }

  /**
   * Path part for operation findOffices
   */
  static readonly FindOfficesPath = '/office/find';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOffices()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOffices$Response(params: {

    /**
     * Number of pages to skip.
     */
    skipCount: number;

    /**
     * Number of offices on one page.
     */
    takeCount: number;
  }): Observable<StrictHttpResponse<FindOfficesResponse>> {

    const rb = new RequestBuilder(this.rootUrl, CompanyApiService.FindOfficesPath, 'get');
    if (params) {
      rb.query('skipCount', params.skipCount, {});
      rb.query('takeCount', params.takeCount, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FindOfficesResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findOffices$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOffices(params: {

    /**
     * Number of pages to skip.
     */
    skipCount: number;

    /**
     * Number of offices on one page.
     */
    takeCount: number;
  }): Observable<FindOfficesResponse> {

    return this.findOffices$Response(params).pipe(
      map((r: StrictHttpResponse<FindOfficesResponse>) => r.body as FindOfficesResponse)
    );
  }

}
