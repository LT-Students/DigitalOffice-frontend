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
import { EditTaskRequest } from '../models/edit-task-request';
import { FindResponseTaskInfo } from '../models/find-response-task-info';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseTaskResponse } from '../models/operation-result-response-task-response';
import { IEditTaskRequest, IFindTasksRequest, IGetTaskRequest } from '@app/services/api/project/task.service';

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
   * Path part for operation editTask
   */
  static readonly EditTaskPath = '/task/edit';

  /**
   * Editing specific task by Id.
   * *  __The user must be task's project participant, admin or department director of task's department
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editTask()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editTask$Response(params: {

    /**
     * Task global unique identifier.
     */
    Id: string;
    body: EditTaskRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, TaskApiService.EditTaskPath, 'patch');
    if (params) {
      rb.query('Id', params.Id, {});
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
   * Editing specific task by Id.
   * *  __The user must be task's project participant, admin or department director of task's department
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editTask$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editTask(params: IEditTaskRequest): Observable<OperationResultResponse> {

    return this.editTask$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation findTasks
   */
  static readonly FindTasksPath = '/task/find';

  /**
   * Find specific task by parameters: projectId, number, assign.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findTasks()` instead.
   *
   * This method doesn't expect any request body.
   */
  findTasks$Response(params: {

    /**
     * The part of find query that the task name should contain.
     */
    number?: number;

    /**
     * The part of find query that the task project Id should contain.
     */
    projectid?: string;

    /**
     * The part of find query that the user assigned task should contain.
     */
    assignedto?: string;

    /**
     * Number of entries to skip.
     */
    skipCount: number;

    /**
     * Number of task to take.
     */
    takeCount: number;
  }): Observable<StrictHttpResponse<FindResponseTaskInfo>> {

    const rb = new RequestBuilder(this.rootUrl, TaskApiService.FindTasksPath, 'get');
    if (params) {
      rb.query('number', params.number, {});
      rb.query('projectid', params.projectid, {});
      rb.query('assignedto', params.assignedto, {});
      rb.query('skipCount', params.skipCount, {});
      rb.query('takeCount', params.takeCount, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FindResponseTaskInfo>;
      })
    );
  }

  /**
   * Find specific task by parameters: projectId, number, assign.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findTasks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findTasks(params: IFindTasksRequest): Observable<FindResponseTaskInfo> {

    return this.findTasks$Response(params).pipe(
      map((r: StrictHttpResponse<FindResponseTaskInfo>) => r.body as FindResponseTaskInfo)
    );
  }

  /**
   * Path part for operation createTask
   */
  static readonly CreateTaskPath = '/task/create';

  /**
   * Creating new task.
   * *  __The user must have access right__ -- Add/Edit/Remove tasks.
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
   * Creating new task.
   * *  __The user must have access right__ -- Add/Edit/Remove tasks.
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

  /**
   * Path part for operation getTask
   */
  static readonly GetTaskPath = '/task/get';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTask()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTask$Response(params: {

    /**
     * Task global unique identifier.
     */
    Id: string;
  }): Observable<StrictHttpResponse<OperationResultResponseTaskResponse>> {

    const rb = new RequestBuilder(this.rootUrl, TaskApiService.GetTaskPath, 'get');
    if (params) {
      rb.query('Id', params.Id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OperationResultResponseTaskResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTask$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTask(params: IGetTaskRequest): Observable<OperationResultResponseTaskResponse> {

    return this.getTask$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponseTaskResponse>) => r.body as OperationResultResponseTaskResponse)
    );
  }

}
