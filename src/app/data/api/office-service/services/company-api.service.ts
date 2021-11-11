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

import { FindResultResponseOfficeInfo } from '../models/find-result-response-office-info';

@Injectable({
	providedIn: 'root',
})
export class CompanyApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation findOffices
	 */
	static readonly FindOfficesPath = '/office/find';

	/**
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findOffices()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findOffices$Response(params: {
		/**
		 * Number of offices to skip.
		 */
		skipCount: number;

		/**
		 * Number of offices to take.
		 */
		takeCount: number;

		/**
		 * If it is true, response will be have deactivated records.
		 */
		includeDeactivated?: boolean;
	}): Observable<StrictHttpResponse<FindResultResponseOfficeInfo>> {
		const rb = new RequestBuilder(this.rootUrl, CompanyApiService.FindOfficesPath, 'get');
		if (params) {
			rb.query('skipCount', params.skipCount, {});
			rb.query('takeCount', params.takeCount, {});
			rb.query('includeDeactivated', params.includeDeactivated, {});
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
					return r as StrictHttpResponse<FindResultResponseOfficeInfo>;
				})
			);
	}

	/**
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findOffices$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findOffices(params: {
		/**
		 * Number of offices to skip.
		 */
		skipCount: number;

		/**
		 * Number of offices to take.
		 */
		takeCount: number;

		/**
		 * If it is true, response will be have deactivated records.
		 */
		includeDeactivated?: boolean;
	}): Observable<FindResultResponseOfficeInfo> {
		return this.findOffices$Response(params).pipe(
			map((r: StrictHttpResponse<FindResultResponseOfficeInfo>) => r.body as FindResultResponseOfficeInfo)
		);
	}
}
