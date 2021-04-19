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

import { AddPositionRequest } from '../models/add-position-request';
import { EditPositionRequest } from '../models/edit-position-request';
import { PositionResponse } from '../models/position-response';

@Injectable({
  providedIn: 'root',
})
export class PositionApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getPositionById
   */
  static readonly GetPositionByIdPath = '/position/getPositionById';

  /**
   * Returns position by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPositionById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPositionById$Response(params: {

    /**
     * Position global unique identifier.
     */
    positionId: string;
  }): Observable<StrictHttpResponse<PositionResponse>> {

    const rb = new RequestBuilder(this.rootUrl, PositionApiService.GetPositionByIdPath, 'get');
    if (params) {
      rb.query('positionId', params.positionId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PositionResponse>;
      })
    );
  }

  /**
   * Returns position by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPositionById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPositionById(params: {

    /**
     * Position global unique identifier.
     */
    positionId: string;
  }): Observable<PositionResponse> {

    return this.getPositionById$Response(params).pipe(
      map((r: StrictHttpResponse<PositionResponse>) => r.body as PositionResponse)
    );
  }

  /**
   * Path part for operation getPositionsList
   */
  static readonly GetPositionsListPath = '/position/getPositionsList';

  /**
   * Returns all added positions.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPositionsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPositionsList$Response(params?: {
  }): Observable<StrictHttpResponse<Array<PositionResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, PositionApiService.GetPositionsListPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PositionResponse>>;
      })
    );
  }

  /**
   * Returns all added positions.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPositionsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPositionsList(params?: {
  }): Observable<Array<PositionResponse>> {

    return this.getPositionsList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PositionResponse>>) => r.body as Array<PositionResponse>)
    );
  }

  /**
   * Path part for operation addPosition
   */
  static readonly AddPositionPath = '/position/create';

  /**
   * Adds a new position.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addPosition()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPosition$Response(params: {
    body: AddPositionRequest
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, PositionApiService.AddPositionPath, 'post');
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
   * Adds a new position.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addPosition$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPosition(params: {
    body: AddPositionRequest
  }): Observable<string> {

    return this.addPosition$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation editPosition
   */
  static readonly EditPositionPath = '/position/editPosition';

  /**
   * Edits a specified position.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editPosition()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editPosition$Response(params: {
    body: EditPositionRequest
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PositionApiService.EditPositionPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * Edits a specified position.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editPosition$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editPosition(params: {
    body: EditPositionRequest
  }): Observable<void> {

    return this.editPosition$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation disablePositionById
   */
  static readonly DisablePositionByIdPath = '/position/disablePositionById';

  /**
   * Deletes the specified position.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disablePositionById()` instead.
   *
   * This method doesn't expect any request body.
   */
  disablePositionById$Response(params: {

    /**
     * Position global unique identifier.
     */
    positionId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PositionApiService.DisablePositionByIdPath, 'delete');
    if (params) {
      rb.query('positionId', params.positionId, {});
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
   * Deletes the specified position.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `disablePositionById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  disablePositionById(params: {

    /**
     * Position global unique identifier.
     */
    positionId: string;
  }): Observable<void> {

    return this.disablePositionById$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
