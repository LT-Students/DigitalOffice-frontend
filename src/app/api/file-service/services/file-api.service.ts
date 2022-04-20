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

import { EditFileRequest } from '../models/edit-file-request';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseFiles } from '../models/operation-result-response-files';

@Injectable({
  providedIn: 'root',
})
export class FileApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getFile
   */
  static readonly GetFilePath = '/file/get';

  /**
   * Returns the file by Id.
   *
   * The method attempts to get the file by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFile$Response(params: {

    /**
     * Files global unique identifiers.
     */
    filesIds: Array<string>;
  }): Observable<StrictHttpResponse<OperationResultResponseFiles>> {

    const rb = new RequestBuilder(this.rootUrl, FileApiService.GetFilePath, 'get');
    if (params) {
      rb.query('filesIds', params.filesIds, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OperationResultResponseFiles>;
      })
    );
  }

  /**
   * Returns the file by Id.
   *
   * The method attempts to get the file by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFile(params: {

    /**
     * Files global unique identifiers.
     */
    filesIds: Array<string>;
  }): Observable<OperationResultResponseFiles> {

    return this.getFile$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponseFiles>) => r.body as OperationResultResponseFiles)
    );
  }

  /**
   * Path part for operation editFile
   */
  static readonly EditFilePath = '/file/edit';

  /**
   * Editing file by Id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editFile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editFile$Response(params: {

    /**
     * File global unique identifier.
     */
    fileId: string;
    body: EditFileRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, FileApiService.EditFilePath, 'patch');
    if (params) {
      rb.query('fileId', params.fileId, {});
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
   * Editing file by Id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editFile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editFile(params: {

    /**
     * File global unique identifier.
     */
    fileId: string;
    body: EditFileRequest
  }): Observable<OperationResultResponse> {

    return this.editFile$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
