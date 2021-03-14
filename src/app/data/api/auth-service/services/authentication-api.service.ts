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

import { AuthenticationRequest } from '../models/authentication-request';
import { AuthenticationResponse } from '../models/authentication-response';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation login
   */
  static readonly LoginPath = '/login';

  /**
   * User authentication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: {
    body: AuthenticationRequest;
  }): Observable<StrictHttpResponse<AuthenticationResponse>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      AuthenticationApiService.LoginPath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<AuthenticationResponse>;
        })
      );
  }

  /**
   * User authentication.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: {
    body: AuthenticationRequest;
  }): Observable<AuthenticationResponse> {
    return this.login$Response(params).pipe(
      map(
        (r: StrictHttpResponse<AuthenticationResponse>) =>
          r.body as AuthenticationResponse
      )
    );
  }
}
