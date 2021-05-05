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
import { Department } from '../models/department';
import { DepartmentResponse } from '../models/department-response';

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

  /**
   * Path part for operation get
   */
  static readonly GetPath = '/department/get';

  /**
   * Returns department by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get()` instead.
   *
   * This method doesn't expect any request body.
   */
  get$Response(params: {

    /**
     * Department global unique identifier.
     */
    departmentId: string;
  }): Observable<StrictHttpResponse<Department>> {

    const rb = new RequestBuilder(this.rootUrl, DepartmentApiService.GetPath, 'get');
    if (params) {
      rb.query('departmentId', params.departmentId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Department>;
      })
    );
  }

  /**
   * Returns department by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get(params: {

    /**
     * Department global unique identifier.
     */
    departmentId: string;
  }): Observable<Department> {

    return this.get$Response(params).pipe(
      map((r: StrictHttpResponse<Department>) => r.body as Department)
    );
  }

  /**
   * Path part for operation get_1
   */
  static readonly Get_1Path = '/department/find';

  /**
   * Returns finded departments.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get_1()` instead.
   *
   * This method doesn't expect any request body.
   */
  get_1$Response(params?: {
  }): Observable<StrictHttpResponse<Array<DepartmentResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, DepartmentApiService.Get_1Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DepartmentResponse>>;
      })
    );
  }

  /**
   * Returns finded departments.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get_1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get_1(params?: {
  }): Observable<Array<DepartmentResponse>> {

    return this.get_1$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DepartmentResponse>>) => r.body as Array<DepartmentResponse>)
    );
  }

}
