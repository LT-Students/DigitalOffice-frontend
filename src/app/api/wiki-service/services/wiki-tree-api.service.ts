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

import { ActionResultWikiTreeResponse } from '../models/action-result-wiki-tree-response';

@Injectable({
	providedIn: 'root',
})
export class WikiTreeApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation getWiki
	 */
	static readonly GetWikiPath = '/wikiTree/get';

	/**
	 * Get wiki tree
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getWiki()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getWiki$Response(params?: {
		/**
		 * If true - returns deactivated rubrics, false or null - returns only active rubrics
		 */
		includedeactivated?: boolean;
	}): Observable<StrictHttpResponse<ActionResultWikiTreeResponse>> {
		const rb = new RequestBuilder(this.rootUrl, WikiTreeApiService.GetWikiPath, 'get');
		if (params) {
			rb.query('includedeactivated', params.includedeactivated, {});
		}

		return this.http
			.request(
				rb.build({
					responseType: 'json',
					accept: 'application/json',
				})
			)
			.pipe(
				filter((r: any) => r instanceof HttpResponse),
				map((r: HttpResponse<any>) => {
					return r as StrictHttpResponse<ActionResultWikiTreeResponse>;
				})
			);
	}

	/**
	 * Get wiki tree
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getWiki$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getWiki(params?: {
		/**
		 * If true - returns deactivated rubrics, false or null - returns only active rubrics
		 */
		includedeactivated?: boolean;
	}): Observable<ActionResultWikiTreeResponse> {
		return this.getWiki$Response(params).pipe(
			map((r: StrictHttpResponse<ActionResultWikiTreeResponse>) => r.body as ActionResultWikiTreeResponse)
		);
	}
}
