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

import { CreateOfficeRequest } from '../models/create-office-request';
import { EditOfficeRequest } from '../models/edit-office-request';
import { FindResultResponseOfficeInfo } from '../models/find-result-response-office-info';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
  providedIn: 'root',
})
export class OfficeApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createOffice
   */
  static readonly CreateOfficePath = '/office/create';

  /**
   * Adds a new office to company.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createOffice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOffice$Response(params: {
    body: CreateOfficeRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, OfficeApiService.CreateOfficePath, 'post');
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
   * Adds a new office to company.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createOffice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOffice(params: {
    body: CreateOfficeRequest
  }): Observable<OperationResultResponse> {

    return this.createOffice$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
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
     * Number of offices to skip.
     */
    skipCount: number;

    /**
     * Number of offices to take.
     */
    takeCount: number;

    /**
     * If true returns sorted offices from A to Z, false - sorted from Z to A, null - no sorting.
     */
    isAscendingSort?: boolean;

    /**
     * If true returns active offices, false - not active, null - all offices.
     */
    isActive?: boolean;

    /**
     * Returns offices whose names contain a substring.
     */
    nameIncludeSubstring?: string;
  }): Observable<StrictHttpResponse<FindResultResponseOfficeInfo>> {

    const rb = new RequestBuilder(this.rootUrl, OfficeApiService.FindOfficesPath, 'get');
    if (params) {
      rb.query('skipCount', params.skipCount, {});
      rb.query('takeCount', params.takeCount, {});
      rb.query('isAscendingSort', params.isAscendingSort, {});
      rb.query('isActive', params.isActive, {});
      rb.query('nameIncludeSubstring', params.nameIncludeSubstring, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FindResultResponseOfficeInfo>;
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
     * Number of offices to skip.
     */
    skipCount: number;

    /**
     * Number of offices to take.
     */
    takeCount: number;

    /**
     * If true returns sorted offices from A to Z, false - sorted from Z to A, null - no sorting.
     */
    isAscendingSort?: boolean;

    /**
     * If true returns active offices, false - not active, null - all offices.
     */
    isActive?: boolean;

    /**
     * Returns offices whose names contain a substring.
     */
    nameIncludeSubstring?: string;
  }): Observable<FindResultResponseOfficeInfo> {

    return this.findOffices$Response(params).pipe(
      map((r: StrictHttpResponse<FindResultResponseOfficeInfo>) => r.body as FindResultResponseOfficeInfo)
    );
  }

  /**
   * Path part for operation editOffice
   */
  static readonly EditOfficePath = '/office/edit';

  /**
   * Edit the specified office by id.
   * * The user must have to be admin or has right.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editOffice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editOffice$Response(params: {

    /**
     * Office global unique identifier.
     */
    officeId: string;
    body?: EditOfficeRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, OfficeApiService.EditOfficePath, 'patch');
    if (params) {
      rb.query('officeId', params.officeId, {});
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
   * Edit the specified office by id.
   * * The user must have to be admin or has right.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editOffice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editOffice(params: {

    /**
     * Office global unique identifier.
     */
    officeId: string;
    body?: EditOfficeRequest
  }): Observable<OperationResultResponse> {

    return this.editOffice$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
