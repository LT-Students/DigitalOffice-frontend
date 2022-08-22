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

import { FindResultResponseWorkspaceTypeInfo } from '../models/find-result-response-workspace-type-info';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceTypeApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findWorkspaceTypes
   */
  static readonly FindWorkspaceTypesPath = '/workspacetype/find';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findWorkspaceTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  findWorkspaceTypes$Response(params: {

    /**
     * Number of workspace types to skip.
     */
    skipCount: number;

    /**
     * Number of workspace types to take.
     */
    takeCount: number;
  }): Observable<StrictHttpResponse<FindResultResponseWorkspaceTypeInfo>> {

    const rb = new RequestBuilder(this.rootUrl, WorkspaceTypeApiService.FindWorkspaceTypesPath, 'get');
    if (params) {
      rb.query('skipCount', params.skipCount, {});
      rb.query('takeCount', params.takeCount, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FindResultResponseWorkspaceTypeInfo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findWorkspaceTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findWorkspaceTypes(params: {

    /**
     * Number of workspace types to skip.
     */
    skipCount: number;

    /**
     * Number of workspace types to take.
     */
    takeCount: number;
  }): Observable<FindResultResponseWorkspaceTypeInfo> {

    return this.findWorkspaceTypes$Response(params).pipe(
      map((r: StrictHttpResponse<FindResultResponseWorkspaceTypeInfo>) => r.body as FindResultResponseWorkspaceTypeInfo)
    );
  }

}
