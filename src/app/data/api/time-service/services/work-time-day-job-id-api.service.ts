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

import { EditWorkTimeDayJobRequest } from '../models/edit-work-time-day-job-request';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
  providedIn: 'root',
})
export class WorkTimeDayJobIdApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation editWorkTimeDayJob
   */
  static readonly EditWorkTimeDayJobPath = '/worktimedayjob/edit';

  /**
   * Editing specific day job by Id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editWorkTimeDayJob()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editWorkTimeDayJob$Response(params: {

    /**
     * Leave time global unique identifier.
     */
    workTimeDayJobId: string;
    body: EditWorkTimeDayJobRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, WorkTimeDayJobIdApiService.EditWorkTimeDayJobPath, 'patch');
    if (params) {
      rb.query('workTimeDayJobId', params.workTimeDayJobId, {});
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
   * Editing specific day job by Id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editWorkTimeDayJob$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editWorkTimeDayJob(params: {

    /**
     * Leave time global unique identifier.
     */
    workTimeDayJobId: string;
    body: EditWorkTimeDayJobRequest
  }): Observable<OperationResultResponse> {

    return this.editWorkTimeDayJob$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
