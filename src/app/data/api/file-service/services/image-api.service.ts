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

import { AddImageRequest } from '../models/add-image-request';
import { OperationResultResponseImageInfo } from '../models/operation-result-response-image-info';
import { OperationResultResponseListImageInfo } from '../models/operation-result-response-list-image-info';

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
	 * Path part for operation addImage
	 */
	static readonly AddImagePath = '/image/add';

	/**
	 * Add a new image and thumb.
	 *
	 * The method attempts to add the new image and get new file Id. A smaller version of the image (thumb) will also be added. Acceptable image formats: .jpg, .jpeg, .png, , .gif, .bmp, .tga
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `addImage()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	addImage$Response(params: {
		body: AddImageRequest
	}): Observable<StrictHttpResponse<string>> {

		const rb = new RequestBuilder(this.rootUrl, ImageApiService.AddImagePath, 'post');
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
	 * To access the full response (for headers, for example), `addImage$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	addImage(params: {
		body: AddImageRequest
	}): Observable<string> {

		return this.addImage$Response(params).pipe(
			map((r: StrictHttpResponse<string>) => r.body as string)
		);
	}

	/**
	 * Path part for operation getImage
	 */
	static readonly GetImagePath = '/image/get';

	/**
	 * Get image by id.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getImage()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getImage$Response(params: {

		/**
		 * Image global unique identifier.
		 */
		imageId: string;
	}): Observable<StrictHttpResponse<OperationResultResponseImageInfo>> {

		const rb = new RequestBuilder(this.rootUrl, ImageApiService.GetImagePath, 'get');
		if (params) {
			rb.query('imageId', params.imageId, {});
		}

		return this.http.request(rb.build({
			responseType: 'json',
			accept: 'application/json'
		})).pipe(
			filter((r: any) => r instanceof HttpResponse),
			map((r: HttpResponse<any>) => {
				return r as StrictHttpResponse<OperationResultResponseImageInfo>;
			})
		);
	}

	/**
	 * Get image by id.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getImage$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getImage(params: {

		/**
		 * Image global unique identifier.
		 */
		imageId: string;
	}): Observable<OperationResultResponseImageInfo> {

		return this.getImage$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponseImageInfo>) => r.body as OperationResultResponseImageInfo)
		);
	}

	/**
	 * Path part for operation findImages
	 */
	static readonly FindImagesPath = '/image/find';

	/**
	 * Fined images by ids.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findImages()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	findImages$Response(params: {
		body: Array<string>
	}): Observable<StrictHttpResponse<OperationResultResponseListImageInfo>> {

		const rb = new RequestBuilder(this.rootUrl, ImageApiService.FindImagesPath, 'get');
		if (params) {
			rb.body(params.body, 'application/json');
		}

		return this.http.request(rb.build({
			responseType: 'json',
			accept: 'application/json'
		})).pipe(
			filter((r: any) => r instanceof HttpResponse),
			map((r: HttpResponse<any>) => {
				return r as StrictHttpResponse<OperationResultResponseListImageInfo>;
			})
		);
	}

	/**
	 * Fined images by ids.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findImages$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	findImages(params: {
		body: Array<string>
	}): Observable<OperationResultResponseListImageInfo> {

		return this.findImages$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponseListImageInfo>) => r.body as OperationResultResponseListImageInfo)
		);
	}

}
