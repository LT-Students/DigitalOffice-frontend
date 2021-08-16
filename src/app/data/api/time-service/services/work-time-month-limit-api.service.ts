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

import { FindResultResponseWorkTimeMonthLimitInfo } from '../models/find-result-response-work-time-month-limit-info';

@Injectable({
  providedIn: 'root',
})
export class WorkTimeMonthLimitApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findWorkTimeMonthLimits
   */
  static readonly FindWorkTimeMonthLimitsPath = '/worktimemonthlimit/find';

  /**
   * Find work time month limits by filter.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findWorkTimeMonthLimits()` instead.
   *
   * This method doesn't expect any request body.
   */
  findWorkTimeMonthLimits$Response(params?: {
    month?: number;
    year?: number;
    takeCount?: number;
    skipCount?: number;
  }): Observable<StrictHttpResponse<FindResultResponseWorkTimeMonthLimitInfo>> {

    const rb = new RequestBuilder(this.rootUrl, WorkTimeMonthLimitApiService.FindWorkTimeMonthLimitsPath, 'get');
    if (params) {
      rb.query('month', params.month, {});
      rb.query('year', params.year, {});
      rb.query('takeCount', params.takeCount, {});
      rb.query('skipCount', params.skipCount, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FindResultResponseWorkTimeMonthLimitInfo>;
      })
    );
  }

  /**
   * Find work time month limits by filter.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findWorkTimeMonthLimits$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findWorkTimeMonthLimits(params?: {
    month?: number;
    year?: number;
    takeCount?: number;
    skipCount?: number;
  }): Observable<FindResultResponseWorkTimeMonthLimitInfo> {

    return this.findWorkTimeMonthLimits$Response(params).pipe(
      map((r: StrictHttpResponse<FindResultResponseWorkTimeMonthLimitInfo>) => r.body as FindResultResponseWorkTimeMonthLimitInfo)
    );
  }

}
