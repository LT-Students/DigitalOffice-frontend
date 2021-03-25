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

import { LeaveTimeRequest } from '../models/leave-time-request';

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
  static readonly AddLeaveTimePath = '/leavetime/addLeaveTime';

  /**
   * Sets the leavetime for the user.
   *
   *
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
    body: LeaveTimeRequest
  }): Observable<StrictHttpResponse<string>> {

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
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * Sets the leavetime for the user.
   *
   *
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
    body: LeaveTimeRequest
  }): Observable<string> {

    return this.addLeaveTime$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
