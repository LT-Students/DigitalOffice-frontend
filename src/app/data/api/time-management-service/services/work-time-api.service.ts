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

import { EditWorkTimeRequest } from '../models/edit-work-time-request';
import { WorkTimeRequest } from '../models/work-time-request';

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
  static readonly AddWorkTimePath = '/worktime/addWorkTime';

  /**
   * Sets the worktime for the user.
   *
   *
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
    body: WorkTimeRequest
  }): Observable<StrictHttpResponse<string>> {

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
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * Sets the worktime for the user.
   *
   *
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
    body: WorkTimeRequest
  }): Observable<string> {

    return this.addWorkTime$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation editWorkTime
   */
  static readonly EditWorkTimePath = '/worktime/editWorkTime';

  /**
   * Edit the worktime by Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editWorkTime()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editWorkTime$Response(params: {

    /**
     * Needed for edit worktime.
     */
    body: EditWorkTimeRequest
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, WorkTimeApiService.EditWorkTimePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Edit the worktime by Id.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editWorkTime$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editWorkTime(params: {

    /**
     * Needed for edit worktime.
     */
    body: EditWorkTimeRequest
  }): Observable<void> {

    return this.editWorkTime$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
