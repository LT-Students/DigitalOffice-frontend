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

import { CreateLeaveTimeRequest } from '../models/create-leave-time-request';
import { FindResultResponseLeaveTimeInfo } from '../models/find-result-response-leave-time-info';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
  providedIn: 'root',
})
export class LeaveTimeApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation addLeaveTime
   */
  static readonly AddLeaveTimePath = '/leavetime/add';

  /**
   * Sets the leavetime for the user.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addLeaveTime()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addLeaveTime$Response(params: {

    /**
     * Needed for set leavetime.
     */
    body: CreateLeaveTimeRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, LeaveTimeApiService.AddLeaveTimePath, 'post');
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
   * Sets the leavetime for the user.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addLeaveTime$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addLeaveTime(params: {

    /**
     * Needed for set leavetime.
     */
    body: CreateLeaveTimeRequest
  }): Observable<OperationResultResponse> {

    return this.addLeaveTime$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation findLeaveTimes
   */
  static readonly FindLeaveTimesPath = '/leavetime/find';

  /**
   * Find leave times by filter.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findLeaveTimes()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLeaveTimes$Response(params?: {
    userid?: string;
    starttime?: string;
    endtime?: string;
    takeCount?: number;
    skipCount?: number;
  }): Observable<StrictHttpResponse<FindResultResponseLeaveTimeInfo>> {

    const rb = new RequestBuilder(this.rootUrl, LeaveTimeApiService.FindLeaveTimesPath, 'get');
    if (params) {
      rb.query('userid', params.userid, {});
      rb.query('starttime', params.starttime, {});
      rb.query('endtime', params.endtime, {});
      rb.query('takeCount', params.takeCount, {});
      rb.query('skipCount', params.skipCount, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FindResultResponseLeaveTimeInfo>;
      })
    );
  }

  /**
   * Find leave times by filter.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findLeaveTimes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLeaveTimes(params?: {
    userid?: string;
    starttime?: string;
    endtime?: string;
    takeCount?: number;
    skipCount?: number;
  }): Observable<FindResultResponseLeaveTimeInfo> {

    return this.findLeaveTimes$Response(params).pipe(
      map((r: StrictHttpResponse<FindResultResponseLeaveTimeInfo>) => r.body as FindResultResponseLeaveTimeInfo)
    );
  }

}
