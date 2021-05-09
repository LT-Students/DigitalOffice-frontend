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

import { CreateTaskRequest } from '../models/create-task-request';
import { OperationResultResponse } from '../models/operation-result-response';
import { TasksResponse } from '../models/tasks-response';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findTask
   */
  static readonly FindTaskPath = '/task/find';

  /**
   * Find specific task by parameters: projectId, number, assign.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findTask()` instead.
   *
   * This method doesn't expect any request body.
   */
  findTask$Response(params: {

    /**
     * The part that the task name should contain.
     */
    number?: number;

    /**
     * The part that the task shortname should contain.
     */
    projectId?: string;

    /**
     * The part that the user assigned task should contain.
     */
    assign?: string;

    /**
     * Number of pages to skip.
     */
    skipCount: number;

    /**
     * Number of users on one page.
     */
    takeCount: number;
  }): Observable<StrictHttpResponse<TasksResponse>> {

    const rb = new RequestBuilder(this.rootUrl, TaskApiService.FindTaskPath, 'get');
    if (params) {
      rb.query('number', params.number, {});
      rb.query('projectId', params.projectId, {});
      rb.query('assign', params.assign, {});
      rb.query('skipCount', params.skipCount, {});
      rb.query('takeCount', params.takeCount, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TasksResponse>;
      })
    );
  }

  /**
   * Find specific task by parameters: projectId, number, assign.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findTask$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findTask(params: {

    /**
     * The part that the task name should contain.
     */
    number?: number;

    /**
     * The part that the task shortname should contain.
     */
    projectId?: string;

    /**
     * The part that the user assigned task should contain.
     */
    assign?: string;

    /**
     * Number of pages to skip.
     */
    skipCount: number;

    /**
     * Number of users on one page.
     */
    takeCount: number;
  }): Observable<TasksResponse> {

    return this.findTask$Response(params).pipe(
      map((r: StrictHttpResponse<TasksResponse>) => r.body as TasksResponse)
    );
  }

  /**
   * Path part for operation createTask
   */
  static readonly CreateTaskPath = '/task/create';

  /**
   * Creating new task
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTask()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTask$Response(params: {
    body: CreateTaskRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, TaskApiService.CreateTaskPath, 'post');
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
   * Creating new task
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createTask$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTask(params: {
    body: CreateTaskRequest
  }): Observable<OperationResultResponse> {

    return this.createTask$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
