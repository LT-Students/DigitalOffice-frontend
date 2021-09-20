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

import { NewsRequest } from '../models/news-request';
import { NewsResponse } from '../models/news-response';
import { OperationResultResponse } from '../models/operation-result-response';
import { PatchOperation } from '../models/patch-operation';

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
    body: NewsRequest
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
    body: NewsRequest
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
   * Updates news fields.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editNews()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editNews$Response(params: {

    /**
     * Specific news id
     */
    newsId: string;
    body?: Array<PatchOperation>
  }): Observable<StrictHttpResponse<boolean>> {

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
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * Updates news fields.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editNews$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editNews(params: {

    /**
     * Specific news id
     */
    newsId: string;
    body?: Array<PatchOperation>
  }): Observable<boolean> {

    return this.editNews$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation getNewsById
   */
  static readonly GetNewsByIdPath = '/news/getNewsById';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNewsById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNewsById$Response(params: {

    /**
     * News global unique identifier.
     */
    newsId: string;
  }): Observable<StrictHttpResponse<NewsResponse>> {

    const rb = new RequestBuilder(this.rootUrl, NewsApiService.GetNewsByIdPath, 'get');
    if (params) {
      rb.query('newsId', params.newsId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NewsResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getNewsById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNewsById(params: {

    /**
     * News global unique identifier.
     */
    newsId: string;
  }): Observable<NewsResponse> {

    return this.getNewsById$Response(params).pipe(
      map((r: StrictHttpResponse<NewsResponse>) => r.body as NewsResponse)
    );
  }

  /**
   * Path part for operation findnews
   */
  static readonly FindnewsPath = '/news/find';

  /**
   * Returns all news information by filter.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findnews()` instead.
   *
   * This method doesn't expect any request body.
   */
  findnews$Response(params?: {

    /**
     * Author global unique identifier.
     */
    authorId?: string;

    /**
     * Department global unique identifier.
     */
    departmentId?: string;

    /**
     * Pseudonym of news author.
     */
    Pseudonym?: string;

    /**
     * Subject of news.
     */
    subject?: string;
  }): Observable<StrictHttpResponse<Array<NewsResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, NewsApiService.FindnewsPath, 'get');
    if (params) {
      rb.query('authorId', params.authorId, {});
      rb.query('departmentId', params.departmentId, {});
      rb.query('Pseudonym', params.Pseudonym, {});
      rb.query('subject', params.subject, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<NewsResponse>>;
      })
    );
  }

  /**
   * Returns all news information by filter.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findnews$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findnews(params?: {

    /**
     * Author global unique identifier.
     */
    authorId?: string;

    /**
     * Department global unique identifier.
     */
    departmentId?: string;

    /**
     * Pseudonym of news author.
     */
    Pseudonym?: string;

    /**
     * Subject of news.
     */
    subject?: string;
  }): Observable<Array<NewsResponse>> {

    return this.findnews$Response(params).pipe(
      map((r: StrictHttpResponse<Array<NewsResponse>>) => r.body as Array<NewsResponse>)
    );
  }

}
