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

import { AddDepartmentRequest } from '../models/add-department-request';

@Injectable({
  providedIn: 'root',
})
export class DepartmentApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation addDepartment
   */
  static readonly AddDepartmentPath = '/department/create';

  /**
   * Adds a new department to company.
   * * __The user must have access to the right__ -- Add/Edit/Remove departments.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addDepartment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDepartment$Response(params: {
    body: AddDepartmentRequest
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, DepartmentApiService.AddDepartmentPath, 'post');
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
   * Adds a new department to company.
   * * __The user must have access to the right__ -- Add/Edit/Remove departments.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addDepartment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDepartment(params: {
    body: AddDepartmentRequest
  }): Observable<string> {

    return this.addDepartment$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
