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
import { EditWorkTimeRequest } from '../models/edit-work-time-request';
import { FindResultResponseWorkTimeInfo } from '../models/find-result-response-work-time-info';
import { OperationResultResponse } from '../models/operation-result-response';
import { IEditWorkTimeRequest, IFindWorkTimesRequest } from '@app/services/time/time.service';

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
   * Path part for operation addWorkTime
   */
  static readonly AddWorkTimePath = '/worktime/add';

  /**
   * Sets the worktime for the user.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addWorkTime()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addWorkTime$Response(params: {

    /**
     * Needed for set worktime.
     */
    body: CreateWorkTimeRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, WorkTimeApiService.AddWorkTimePath, 'post');
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
   * Sets the worktime for the user.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addWorkTime$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addWorkTime(params: {

    /**
     * Needed for set worktime.
     */
    body: CreateWorkTimeRequest
  }): Observable<OperationResultResponse> {

    return this.addWorkTime$Response(params).pipe(
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
    starttime?: string;
    endtime?: string;
    takeCount?: number;
    skipCount?: number;
  }): Observable<StrictHttpResponse<FindResultResponseWorkTimeInfo>> {

    const rb = new RequestBuilder(this.rootUrl, WorkTimeApiService.FindWorkTimesPath, 'get');
    if (params) {
      rb.query('userid', params.userid, {});
      rb.query('projectid', params.projectid, {});
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
        return r as StrictHttpResponse<FindResultResponseWorkTimeInfo>;
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
  findWorkTimes(params?: IFindWorkTimesRequest): Observable<FindResultResponseWorkTimeInfo> {

    return this.findWorkTimes$Response(params).pipe(
      map((r: StrictHttpResponse<FindResultResponseWorkTimeInfo>) => r.body as FindResultResponseWorkTimeInfo)
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
  editWorkTime(params: IEditWorkTimeRequest): Observable<OperationResultResponse> {

    return this.editWorkTime$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
