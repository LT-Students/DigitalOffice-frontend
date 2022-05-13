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

import { CreateWorkTimeRequest } from '../models/create-work-time-request';
import { EditWorkTimeMonthLimitRequest } from '../models/edit-work-time-month-limit-request';
import { EditWorkTimeRequest } from '../models/edit-work-time-request';
import { FindResultResponseWorkTimeResponse } from '../models/find-result-response-work-time-response';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
  providedIn: 'root',
})
export class WorkTimeApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createWorkTime
   */
  static readonly CreateWorkTimePath = '/worktime/create';

  /**
   * Create worktime without reference to the project.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createWorkTime()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createWorkTime$Response(params: {
    body: CreateWorkTimeRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, WorkTimeApiService.CreateWorkTimePath, 'post');
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
   * Create worktime without reference to the project.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createWorkTime$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createWorkTime(params: {
    body: CreateWorkTimeRequest
  }): Observable<OperationResultResponse> {

    return this.createWorkTime$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation findWorkTimes
   */
  static readonly FindWorkTimesPath = '/worktime/find';

  /**
   * Find work times by filter.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findWorkTimes()` instead.
   *
   * This method doesn't expect any request body.
   */
  findWorkTimes$Response(params?: {
    userid?: string;
    projectid?: string;
    month?: number;
    year?: number;
    includedayjobs?: boolean;
    takeCount?: number;
    skipCount?: number;
  }): Observable<StrictHttpResponse<FindResultResponseWorkTimeResponse>> {

    const rb = new RequestBuilder(this.rootUrl, WorkTimeApiService.FindWorkTimesPath, 'get');
    if (params) {
      rb.query('userid', params.userid, {});
      rb.query('projectid', params.projectid, {});
      rb.query('month', params.month, {});
      rb.query('year', params.year, {});
      rb.query('includedayjobs', params.includedayjobs, {});
      rb.query('takeCount', params.takeCount, {});
      rb.query('skipCount', params.skipCount, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FindResultResponseWorkTimeResponse>;
      })
    );
  }

  /**
   * Find work times by filter.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findWorkTimes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findWorkTimes(params?: {
    userid?: string;
    projectid?: string;
    month?: number;
    year?: number;
    includedayjobs?: boolean;
    takeCount?: number;
    skipCount?: number;
  }): Observable<FindResultResponseWorkTimeResponse> {

    return this.findWorkTimes$Response(params).pipe(
      map((r: StrictHttpResponse<FindResultResponseWorkTimeResponse>) => r.body as FindResultResponseWorkTimeResponse)
    );
  }

  /**
   * Path part for operation editWorkTime
   */
  static readonly EditWorkTimePath = '/worktime/edit';

  /**
   * Editing specific work time by Id.
   * *  __User has edit only himself if his is not admin.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editWorkTime()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editWorkTime$Response(params: {

    /**
     * Work time global unique identifier.
     */
    workTimeId: string;
    body: EditWorkTimeRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, WorkTimeApiService.EditWorkTimePath, 'patch');
    if (params) {
      rb.query('workTimeId', params.workTimeId, {});
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
   * Editing specific work time by Id.
   * *  __User has edit only himself if his is not admin.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editWorkTime$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editWorkTime(params: {

    /**
     * Work time global unique identifier.
     */
    workTimeId: string;
    body: EditWorkTimeRequest
  }): Observable<OperationResultResponse> {

    return this.editWorkTime$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation editWorkTimeMonthLimit
   */
  static readonly EditWorkTimeMonthLimitPath = '/worktimemonthlimit/edit';

  /**
   * Editing specific work time month limit by Id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editWorkTimeMonthLimit()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editWorkTimeMonthLimit$Response(params: {

    /**
     * Work time global unique identifier.
     */
    workTimeMonthLimitId: string;
    body: EditWorkTimeMonthLimitRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, WorkTimeApiService.EditWorkTimeMonthLimitPath, 'patch');
    if (params) {
      rb.query('workTimeMonthLimitId', params.workTimeMonthLimitId, {});
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
   * Editing specific work time month limit by Id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editWorkTimeMonthLimit$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editWorkTimeMonthLimit(params: {

    /**
     * Work time global unique identifier.
     */
    workTimeMonthLimitId: string;
    body: EditWorkTimeMonthLimitRequest
  }): Observable<OperationResultResponse> {

    return this.editWorkTimeMonthLimit$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
