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

import { ImageRequest } from '../models/image-request';

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
   * Path part for operation addNewImage
   */
  static readonly AddNewImagePath = '/file/addNewImage';

  /**
   * Add a new image and thumb.
   *
   * The method attempts to add the new image and get new file Id. A smaller version of the image (thumb) will also be added. Acceptable image formats: .jpg, .jpeg, .png, , .gif, .bmp, .tga
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addNewImage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNewImage$Response(params: {
    body: ImageRequest
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ImageApiService.AddNewImagePath, 'post');
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
   * Add a new image and thumb.
   *
   * The method attempts to add the new image and get new file Id. A smaller version of the image (thumb) will also be added. Acceptable image formats: .jpg, .jpeg, .png, , .gif, .bmp, .tga
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addNewImage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNewImage(params: {
    body: ImageRequest
  }): Observable<string> {

    return this.addNewImage$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
