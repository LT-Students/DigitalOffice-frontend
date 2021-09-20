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

import { CreateCommunicationRequest } from '../models/create-communication-request';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
  providedIn: 'root',
})
export class AvatarApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createAvatar
   */
  static readonly CreateAvatarPath = '/image/create';

  /**
   * The method attempts to add avatar to user. The user must have the rights to add images to other users - Add/Edit/Remove users.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAvatar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAvatar$Response(params: {
    body: CreateCommunicationRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AvatarApiService.CreateAvatarPath, 'post');
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
   * The method attempts to add avatar to user. The user must have the rights to add images to other users - Add/Edit/Remove users.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAvatar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAvatar(params: {
    body: CreateCommunicationRequest
  }): Observable<OperationResultResponse> {

    return this.createAvatar$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
