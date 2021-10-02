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

import { CreateNewsRequest } from '../models/create-news-request';
import { EditNewsRequest } from '../models/edit-news-request';
import { FindResultResponseNewsInfo } from '../models/find-result-response-news-info';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseNewsResponse } from '../models/operation-result-response-news-response';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createNews
   */
  static readonly CreateNewsPath = '/news/create';

  /**
   * Adds news and returns its Id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createNews()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNews$Response(params: {
    body: CreateNewsRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, NewsApiService.CreateNewsPath, 'post');
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
   * Adds news and returns its Id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createNews$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNews(params: {
    body: CreateNewsRequest
  }): Observable<OperationResultResponse> {

    return this.createNews$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation editNews
   */
  static readonly EditNewsPath = '/news/edit';

  /**
   * Edit the specified news by id.
   * * The user must have to be owner or has right.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editNews()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editNews$Response(params: {

    /**
     * News global unique identifier.
     */
    newsId: string;
    body?: Array<EditNewsRequest>
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, NewsApiService.EditNewsPath, 'patch');
    if (params) {
      rb.query('newsId', params.newsId, {});
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
   * Edit the specified news by id.
   * * The user must have to be owner or has right.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editNews$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editNews(params: {

    /**
     * News global unique identifier.
     */
    newsId: string;
    body?: Array<EditNewsRequest>
  }): Observable<OperationResultResponse> {

    return this.editNews$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation getNews
   */
  static readonly GetNewsPath = '/news/get';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNews()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNews$Response(params: {

    /**
     * News global unique identifier.
     */
    newsId: string;
  }): Observable<StrictHttpResponse<OperationResultResponseNewsResponse>> {

    const rb = new RequestBuilder(this.rootUrl, NewsApiService.GetNewsPath, 'get');
    if (params) {
      rb.query('newsId', params.newsId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OperationResultResponseNewsResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getNews$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNews(params: {

    /**
     * News global unique identifier.
     */
    newsId: string;
  }): Observable<OperationResultResponseNewsResponse> {

    return this.getNews$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponseNewsResponse>) => r.body as OperationResultResponseNewsResponse)
    );
  }

  /**
   * Path part for operation findNews
   */
  static readonly FindNewsPath = '/news/find';

  /**
   * Returns all news information by filter.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findNews()` instead.
   *
   * This method doesn't expect any request body.
   */
  findNews$Response(params: {

    /**
     * Number of entries to skip.
     */
    skipCount: number;

    /**
     * Number of users to take.
     */
    takeCount: number;

    /**
     * Author global unique identifier.
     */
    authorId?: string;

    /**
     * Department global unique identifier.
     */
    departmentId?: string;
    includeDeactivated?: boolean;
  }): Observable<StrictHttpResponse<FindResultResponseNewsInfo>> {

    const rb = new RequestBuilder(this.rootUrl, NewsApiService.FindNewsPath, 'get');
    if (params) {
      rb.query('skipCount', params.skipCount, {});
      rb.query('takeCount', params.takeCount, {});
      rb.query('authorId', params.authorId, {});
      rb.query('departmentId', params.departmentId, {});
      rb.query('includeDeactivated', params.includeDeactivated, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FindResultResponseNewsInfo>;
      })
    );
  }

  /**
   * Returns all news information by filter.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findNews$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findNews(params: {

    /**
     * Number of entries to skip.
     */
    skipCount: number;

    /**
     * Number of users to take.
     */
    takeCount: number;

    /**
     * Author global unique identifier.
     */
    authorId?: string;

    /**
     * Department global unique identifier.
     */
    departmentId?: string;
    includeDeactivated?: boolean;
  }): Observable<FindResultResponseNewsInfo> {

    return this.findNews$Response(params).pipe(
      map((r: StrictHttpResponse<FindResultResponseNewsInfo>) => r.body as FindResultResponseNewsInfo)
    );
  }

}
