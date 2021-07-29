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
import { EditCommunicationRequest } from '../models/edit-communication-request';
import { OperationResultResponse } from '../models/operation-result-response';
import { IEditCommunicationRequest } from '@app/types/edit-communication-request.interface';
import { IRemoveCommunicationRequest } from '@app/services/communication.service';

@Injectable({
  providedIn: 'root',
})
export class CommunicationApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createCommunication
   */
  static readonly CreateCommunicationPath = '/communication/create';

  /**
   * The method attempts to add the communication. The user must have the rights to add education to other users - Add/Edit/Remove users.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCommunication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCommunication$Response(params: {
    body: CreateCommunicationRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, CommunicationApiService.CreateCommunicationPath, 'post');
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
   * The method attempts to add the communication. The user must have the rights to add education to other users - Add/Edit/Remove users.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createCommunication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCommunication(params: {
    body: CreateCommunicationRequest
  }): Observable<OperationResultResponse> {

    return this.createCommunication$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation editCommunication
   */
  static readonly EditCommunicationPath = '/communication/edit';

  /**
   * Update communication properties. The user must have the rights to edit communication to other users - Add/Edit/Remove users.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editCommunication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editCommunication$Response(params: {

    /**
     * Specific communication id
     */
    communicationId: string;
    body?: EditCommunicationRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, CommunicationApiService.EditCommunicationPath, 'patch');
    if (params) {
      rb.query('communicationId', params.communicationId, {});
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
   * Update communication properties. The user must have the rights to edit communication to other users - Add/Edit/Remove users.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editCommunication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editCommunication(params: IEditCommunicationRequest): Observable<OperationResultResponse> {

    return this.editCommunication$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation removeCommunication
   */
  static readonly RemoveCommunicationPath = '/communication/remove';

  /**
   * Remove the specified communication by id. The user must have the rights to remove communication to other users - Add/Edit/Remove users.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeCommunication()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeCommunication$Response(params: IRemoveCommunicationRequest): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, CommunicationApiService.RemoveCommunicationPath, 'delete');
    if (params) {
      rb.query('communicationId', params.communicationId, {});
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
   * Remove the specified communication by id. The user must have the rights to remove communication to other users - Add/Edit/Remove users.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeCommunication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeCommunication(params: IRemoveCommunicationRequest): Observable<OperationResultResponse> {

    return this.removeCommunication$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
