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

import { CreatePositionRequest } from '../models/create-position-request';
import { EditPositionRequest } from '../models/edit-position-request';
import { OperationResultResponse } from '../models/operation-result-response';
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
   * Path part for operation getPosition
   */
  static readonly GetPositionPath = '/position/get';

  /**
   * Returns position by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPosition()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPosition$Response(params: {

    /**
     * Position global unique identifier.
     */
    positionId: string;
  }): Observable<StrictHttpResponse<PositionResponse>> {

    const rb = new RequestBuilder(this.rootUrl, PositionApiService.GetPositionPath, 'get');
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
   * To access the full response (for headers, for example), `getPosition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPosition(params: {

    /**
     * Position global unique identifier.
     */
    positionId: string;
  }): Observable<PositionResponse> {

    return this.getPosition$Response(params).pipe(
      map((r: StrictHttpResponse<PositionResponse>) => r.body as PositionResponse)
    );
  }

  /**
   * Path part for operation findPositions
   */
  static readonly FindPositionsPath = '/position/find';

  /**
   * Returns all added positions.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPositions()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPositions$Response(params?: {
  }): Observable<StrictHttpResponse<Array<PositionResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, PositionApiService.FindPositionsPath, 'get');
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
   * To access the full response (for headers, for example), `findPositions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPositions(params?: {
  }): Observable<Array<PositionResponse>> {

    return this.findPositions$Response(params).pipe(
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
    body: CreatePositionRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

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
        return r as StrictHttpResponse<OperationResultResponse>;
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
    body: CreatePositionRequest
  }): Observable<OperationResultResponse> {

    return this.addPosition$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation editPosition
   */
  static readonly EditPositionPath = '/position/edit';

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
   * Path part for operation disablePosition
   */
  static readonly DisablePositionPath = '/position/disable';

  /**
   * Deletes the specified position.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disablePosition()` instead.
   *
   * This method doesn't expect any request body.
   */
  disablePosition$Response(params: {

    /**
     * Position global unique identifier.
     */
    positionId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PositionApiService.DisablePositionPath, 'delete');
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
   * To access the full response (for headers, for example), `disablePosition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  disablePosition(params: {

    /**
     * Position global unique identifier.
     */
    positionId: string;
  }): Observable<void> {

    return this.disablePosition$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
