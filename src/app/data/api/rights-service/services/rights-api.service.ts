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

import { RightResponse } from '../models/right-response';

@Injectable({
  providedIn: 'root',
})
export class RightsApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation addRightsForUser
   */
  static readonly AddRightsForUserPath = '/rights/addRightsForUser';

  /**
   * Add rights for user.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addRightsForUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  addRightsForUser$Response(params: {

    /**
     * User global unique identifier.
     */
    userId: string;

    /**
     * Right identifiers.
     */
    rightIds: Array<number>;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RightsApiService.AddRightsForUserPath, 'post');
    if (params) {
      rb.query('userId', params.userId, {});
      rb.query('rightIds', params.rightIds, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Add rights for user.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addRightsForUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addRightsForUser(params: {

    /**
     * User global unique identifier.
     */
    userId: string;

    /**
     * Right identifiers.
     */
    rightIds: Array<number>;
  }): Observable<void> {

    return this.addRightsForUser$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getRightsList
   */
  static readonly GetRightsListPath = '/rights/getRightsList';

  /**
   * Add rights for user.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRightsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRightsList$Response(params?: {
  }): Observable<StrictHttpResponse<Array<RightResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, RightsApiService.GetRightsListPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RightResponse>>;
      })
    );
  }

  /**
   * Add rights for user.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRightsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRightsList(params?: {
  }): Observable<Array<RightResponse>> {

    return this.getRightsList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RightResponse>>) => r.body as Array<RightResponse>)
    );
  }

  /**
   * Path part for operation removeRightsFromUser
   */
  static readonly RemoveRightsFromUserPath = '/rights/removeRightsFromUser';

  /**
   * Remove rights from user.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeRightsFromUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeRightsFromUser$Response(params: {

    /**
     * User global unique identifier.
     */
    userId: string;

    /**
     * Right identifiers.
     */
    rightIds: Array<number>;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RightsApiService.RemoveRightsFromUserPath, 'delete');
    if (params) {
      rb.query('userId', params.userId, {});
      rb.query('rightIds', params.rightIds, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Remove rights from user.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeRightsFromUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeRightsFromUser(params: {

    /**
     * User global unique identifier.
     */
    userId: string;

    /**
     * Right identifiers.
     */
    rightIds: Array<number>;
  }): Observable<void> {

    return this.removeRightsFromUser$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}