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

import { CreateEducationFormRequest } from '../models/create-education-form-request';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
  providedIn: 'root',
})
export class EducationFormApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createEducationForm
   */
  static readonly CreateEducationFormPath = '/educationform/create';

  /**
   * The method attempts to add education's form.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createEducationForm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createEducationForm$Response(params: {
    body: CreateEducationFormRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, EducationFormApiService.CreateEducationFormPath, 'post');
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
   * The method attempts to add education's form.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createEducationForm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createEducationForm(params: {
    body: CreateEducationFormRequest
  }): Observable<OperationResultResponse> {

    return this.createEducationForm$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
