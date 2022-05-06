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

import { ChangeUserOfficeRequest } from '../models/change-user-office-request';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
  providedIn: 'root',
})
export class UserOfficeApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation changeOffice
   */
  static readonly ChangeOfficePath = '/users/change';

  /**
   * Change office of user.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeOffice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeOffice$Response(params: {
    body: ChangeUserOfficeRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UserOfficeApiService.ChangeOfficePath, 'post');
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
   * Change office of user.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changeOffice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeOffice(params: {
    body: ChangeUserOfficeRequest
  }): Observable<OperationResultResponse> {

    return this.changeOffice$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
