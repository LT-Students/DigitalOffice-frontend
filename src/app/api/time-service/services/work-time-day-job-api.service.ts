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

import { CreateWorkTimeDayJobRequest } from '../models/create-work-time-day-job-request';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
  providedIn: 'root',
})
export class WorkTimeDayJobApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createWorkTimeDayJob
   */
  static readonly CreateWorkTimeDayJobPath = '/worktimedayjob/create';

  /**
   * Create the day job for the worktime.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createWorkTimeDayJob()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createWorkTimeDayJob$Response(params: {
    body: CreateWorkTimeDayJobRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, WorkTimeDayJobApiService.CreateWorkTimeDayJobPath, 'post');
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
   * Create the day job for the worktime.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createWorkTimeDayJob$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createWorkTimeDayJob(params: {
    body: CreateWorkTimeDayJobRequest
  }): Observable<OperationResultResponse> {

    return this.createWorkTimeDayJob$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
