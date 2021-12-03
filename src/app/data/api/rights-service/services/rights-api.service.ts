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

import { OperationResultResponseRights } from '../models/operation-result-response-rights';

@Injectable({
	providedIn: 'root',
})
export class RightsApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation getRightsList
	 */
	static readonly GetRightsListPath = '/rights/get';

	/**
	 * Get all rights.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getRightsList()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getRightsList$Response(params: {
		/**
		 * Localization of rights.
		 */
		locale: string;
	}): Observable<StrictHttpResponse<OperationResultResponseRights>> {
		const rb = new RequestBuilder(this.rootUrl, RightsApiService.GetRightsListPath, 'get');
		if (params) {
			rb.query('locale', params.locale, {});
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
					return r as StrictHttpResponse<OperationResultResponseRights>;
				})
			);
	}

	/**
	 * Get all rights.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getRightsList$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getRightsList(params: {
		/**
		 * Localization of rights.
		 */
		locale: string;
	}): Observable<OperationResultResponseRights> {
		return this.getRightsList$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponseRights>) => r.body as OperationResultResponseRights)
		);
	}
}
