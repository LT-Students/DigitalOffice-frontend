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

import { CreateContractSubjectRequest } from '../models/create-contract-subject-request';
import { EditContractSubjectRequest } from '../models/edit-contract-subject-request';
import { FindResultResponseContractSubjectInfo } from '../models/find-result-response-contract-subject-info';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
  providedIn: 'root',
})
export class ContractSubjectApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findContractSubjects
   */
  static readonly FindContractSubjectsPath = '/contractsubject/get';

  /**
   * Returns all contract subject information with pagination.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findContractSubjects()` instead.
   *
   * This method doesn't expect any request body.
   */
  findContractSubjects$Response(params: {

    /**
     * Number of entries to skip.
     */
    skipCount: number;

    /**
     * Number of contract subjects to take.
     */
    takeCount: number;

    /**
     * Get only active or not active contract subjects.
     */
    isactive?: boolean;
  }): Observable<StrictHttpResponse<FindResultResponseContractSubjectInfo>> {

    const rb = new RequestBuilder(this.rootUrl, ContractSubjectApiService.FindContractSubjectsPath, 'get');
    if (params) {
      rb.query('skipCount', params.skipCount, {});
      rb.query('takeCount', params.takeCount, {});
      rb.query('isactive', params.isactive, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FindResultResponseContractSubjectInfo>;
      })
    );
  }

  /**
   * Returns all contract subject information with pagination.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findContractSubjects$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findContractSubjects(params: {

    /**
     * Number of entries to skip.
     */
    skipCount: number;

    /**
     * Number of contract subjects to take.
     */
    takeCount: number;

    /**
     * Get only active or not active contract subjects.
     */
    isactive?: boolean;
  }): Observable<FindResultResponseContractSubjectInfo> {

    return this.findContractSubjects$Response(params).pipe(
      map((r: StrictHttpResponse<FindResultResponseContractSubjectInfo>) => r.body as FindResultResponseContractSubjectInfo)
    );
  }

  /**
   * Path part for operation createContractSubject
   */
  static readonly CreateContractSubjectPath = '/contractsubject/create';

  /**
   * Adds a new contract subject.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createContractSubject()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createContractSubject$Response(params: {
    body: CreateContractSubjectRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ContractSubjectApiService.CreateContractSubjectPath, 'post');
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
   * Adds a new contract subject.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createContractSubject$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createContractSubject(params: {
    body: CreateContractSubjectRequest
  }): Observable<OperationResultResponse> {

    return this.createContractSubject$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation editContractSubject
   */
  static readonly EditContractSubjectPath = '/contractsubject/edit';

  /**
   * Chage contract subject's name, description, or active status.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editContractSubject()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editContractSubject$Response(params: {

    /**
     * Unique contract subject identifier.
     */
    contractsubjectId: string;
    body?: EditContractSubjectRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ContractSubjectApiService.EditContractSubjectPath, 'patch');
    if (params) {
      rb.query('contractsubjectId', params.contractsubjectId, {});
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
   * Chage contract subject's name, description, or active status.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editContractSubject$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editContractSubject(params: {

    /**
     * Unique contract subject identifier.
     */
    contractsubjectId: string;
    body?: EditContractSubjectRequest
  }): Observable<OperationResultResponse> {

    return this.editContractSubject$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
