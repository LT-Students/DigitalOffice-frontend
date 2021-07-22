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

import { CreateEducationRequest } from '../models/create-education-request';
import { EditEducationRequest } from '../models/edit-education-request';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
  providedIn: 'root',
})
export class EducationApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createEducation
   */
  static readonly CreateEducationPath = '/education/create';

  /**
   * The method attempts to add the education. The user must have the rights to add education to other users - Add/Edit/Remove users.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createEducation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createEducation$Response(params: {
    body: CreateEducationRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, EducationApiService.CreateEducationPath, 'post');
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
   * The method attempts to add the education. The user must have the rights to add education to other users - Add/Edit/Remove users.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createEducation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createEducation(params: {
    body: CreateEducationRequest
  }): Observable<OperationResultResponse> {

    return this.createEducation$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation editEducation
   */
  static readonly EditEducationPath = '/education/edit';

  /**
   * Update education properties. The user must have the rights to edit education to other users - Add/Edit/Remove users.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editEducation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editEducation$Response(params: {

    /**
     * Specific education id
     */
    educationId: string;
    body?: EditEducationRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, EducationApiService.EditEducationPath, 'patch');
    if (params) {
      rb.query('educationId', params.educationId, {});
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
   * Update education properties. The user must have the rights to edit education to other users - Add/Edit/Remove users.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editEducation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editEducation(params: {

    /**
     * Specific education id
     */
    educationId: string;
    body?: EditEducationRequest
  }): Observable<OperationResultResponse> {

    return this.editEducation$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation removeEducation
   */
  static readonly RemoveEducationPath = '/education/remove';

  /**
   * Remove the specified education by id. The user must have the rights to remove education to other users - Add/Edit/Remove users.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeEducation()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeEducation$Response(params: {

    /**
     * Education global unique identifier.
     */
    educationId: string;
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, EducationApiService.RemoveEducationPath, 'delete');
    if (params) {
      rb.query('educationId', params.educationId, {});
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
   * Remove the specified education by id. The user must have the rights to remove education to other users - Add/Edit/Remove users.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeEducation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeEducation(params: {

    /**
     * Education global unique identifier.
     */
    educationId: string;
  }): Observable<OperationResultResponse> {

    return this.removeEducation$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
