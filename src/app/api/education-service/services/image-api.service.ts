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

import { CreateImageRequest } from '../models/create-image-request';
import { OperationResultResponse } from '../models/operation-result-response';
import { RemoveImagesRequest } from '../models/remove-images-request';

@Injectable({
  providedIn: 'root',
})
export class ImageApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createImage
   */
  static readonly CreateImagePath = '/image/create';

  /**
   * The method attempts to add image to user/certificate/education.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createImage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createImage$Response(params: {
    body: CreateImageRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ImageApiService.CreateImagePath, 'post');
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
   * The method attempts to add image to user/certificate/education.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createImage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createImage(params: {
    body: CreateImageRequest
  }): Observable<OperationResultResponse> {

    return this.createImage$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation removeImages
   */
  static readonly RemoveImagesPath = '/image/remove';

  /**
   * The method attempts to remove images from entity
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeImages()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  removeImages$Response(params: {
    body: RemoveImagesRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ImageApiService.RemoveImagesPath, 'post');
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
   * The method attempts to remove images from entity
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeImages$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  removeImages(params: {
    body: RemoveImagesRequest
  }): Observable<OperationResultResponse> {

    return this.removeImages$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
