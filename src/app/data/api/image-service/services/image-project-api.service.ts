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

import { OperationResultResponseImageResponse } from '../models/operation-result-response-image-response';

@Injectable({
  providedIn: 'root',
})
export class ImageProjectApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getImageProject
   */
  static readonly GetImageProjectPath = '/imageproject/get';

  /**
   * Returns image information of Project.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImageProject()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImageProject$Response(params: {

    /**
     * Image global unique identifier.
     */
    imageId: string;
  }): Observable<StrictHttpResponse<OperationResultResponseImageResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ImageProjectApiService.GetImageProjectPath, 'get');
    if (params) {
      rb.query('imageId', params.imageId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OperationResultResponseImageResponse>;
      })
    );
  }

  /**
   * Returns image information of Project.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImageProject$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImageProject(params: {

    /**
     * Image global unique identifier.
     */
    imageId: string;
  }): Observable<OperationResultResponseImageResponse> {

    return this.getImageProject$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponseImageResponse>) => r.body as OperationResultResponseImageResponse)
    );
  }

}
