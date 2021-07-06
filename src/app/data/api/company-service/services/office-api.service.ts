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

}
