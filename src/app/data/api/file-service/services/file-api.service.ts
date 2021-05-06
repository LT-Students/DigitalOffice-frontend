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

import { File } from '../models/file';

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
   * Path part for operation addNewFile
   */
  static readonly AddNewFilePath = '/file/addNewFile';

  /**
   * Add a new file.
   *
   * The method attempts to add the new file.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addNewFile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNewFile$Response(params: {
    body: File
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, FileApiService.AddNewFilePath, 'post');
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
   * Add a new file.
   *
   * The method attempts to add the new file.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addNewFile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNewFile(params: {
    body: File
  }): Observable<string> {

    return this.addNewFile$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getFileById
   */
  static readonly GetFileByIdPath = '/file/getFileById';

  /**
   * Returns the file by Id.
   *
   * The method attempts to get the file by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFileById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFileById$Response(params: {

    /**
     * File global unique identifier.
     */
    fileId: string;
  }): Observable<StrictHttpResponse<Array<File>>> {

    const rb = new RequestBuilder(this.rootUrl, FileApiService.GetFileByIdPath, 'get');
    if (params) {
      rb.query('fileId', params.fileId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<File>>;
      })
    );
  }

  /**
   * Returns the file by Id.
   *
   * The method attempts to get the file by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFileById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFileById(params: {

    /**
     * File global unique identifier.
     */
    fileId: string;
  }): Observable<Array<File>> {

    return this.getFileById$Response(params).pipe(
      map((r: StrictHttpResponse<Array<File>>) => r.body as Array<File>)
    );
  }

  /**
   * Path part for operation disableFileById
   */
  static readonly DisableFileByIdPath = '/file/disableFileById';

  /**
   * Disable the file by Id.
   *
   * The method attempts to disable file by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disableFileById()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableFileById$Response(params: {

    /**
     * File global unique identifier.
     */
    fileId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, FileApiService.DisableFileByIdPath, 'get');
    if (params) {
      rb.query('fileId', params.fileId, {});
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
   * Disable the file by Id.
   *
   * The method attempts to disable file by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `disableFileById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableFileById(params: {

    /**
     * File global unique identifier.
     */
    fileId: string;
  }): Observable<void> {

    return this.disableFileById$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
