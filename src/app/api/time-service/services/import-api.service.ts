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

import { OperationResultResponseByteArray } from '../models/operation-result-response-byte-array';

@Injectable({
  providedIn: 'root',
})
export class ImportApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getImport
   */
  static readonly GetImportPath = '/import/get';

  /**
   * Import stat.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImport()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImport$Response(params: {
    departmentId?: string;
    projectId?: string;
    month: number;
    year: number;
  }): Observable<StrictHttpResponse<OperationResultResponseByteArray>> {

    const rb = new RequestBuilder(this.rootUrl, ImportApiService.GetImportPath, 'get');
    if (params) {
      rb.query('departmentId', params.departmentId, {});
      rb.query('projectId', params.projectId, {});
      rb.query('month', params.month, {});
      rb.query('year', params.year, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OperationResultResponseByteArray>;
      })
    );
  }

  /**
   * Import stat.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImport(params: {
    departmentId?: string;
    projectId?: string;
    month: number;
    year: number;
  }): Observable<OperationResultResponseByteArray> {

    return this.getImport$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponseByteArray>) => r.body as OperationResultResponseByteArray)
    );
  }

}
