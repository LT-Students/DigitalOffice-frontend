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

import { FindResultResponseUserStatInfo } from '../models/find-result-response-user-stat-info';

@Injectable({
	providedIn: 'root',
})
export class StatApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation findStat
	 */
	static readonly FindStatPath = '/stat/find';

	/**
	 * Find stat by filter.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findStat()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findStat$Response(params: {
		departmentId?: Array<string>;
		projectId?: Array<string>;

		/**
		 * When value is &#x27;true&#x27; sorts A-Z, when value is &#x27;false&#x27; sorts Z-A, when null - without sort
		 */
		ascendingsort?: boolean;

		/**
		 * filter by user&#x27;s name
		 */
		nameincludesubstring?: string;
		month: number;
		year: number;
		takeCount: number;
		skipCount: number;
	}): Observable<StrictHttpResponse<FindResultResponseUserStatInfo>> {
		const rb = new RequestBuilder(this.rootUrl, StatApiService.FindStatPath, 'get');
		if (params) {
			rb.query('departmentId', params.departmentId, {});
			rb.query('projectId', params.projectId, {});
			rb.query('ascendingsort', params.ascendingsort, {});
			rb.query('nameincludesubstring', params.nameincludesubstring, {});
			rb.query('month', params.month, {});
			rb.query('year', params.year, {});
			rb.query('takeCount', params.takeCount, {});
			rb.query('skipCount', params.skipCount, {});
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
					return r as StrictHttpResponse<FindResultResponseUserStatInfo>;
				})
			);
	}

	/**
	 * Find stat by filter.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findStat$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findStat(params: {
		departmentId?: Array<string>;
		projectId?: Array<string>;

		/**
		 * When value is &#x27;true&#x27; sorts A-Z, when value is &#x27;false&#x27; sorts Z-A, when null - without sort
		 */
		ascendingsort?: boolean;

		/**
		 * filter by user&#x27;s name
		 */
		nameincludesubstring?: string;
		month: number;
		year: number;
		takeCount: number;
		skipCount: number;
	}): Observable<FindResultResponseUserStatInfo> {
		return this.findStat$Response(params).pipe(
			map((r: StrictHttpResponse<FindResultResponseUserStatInfo>) => r.body as FindResultResponseUserStatInfo)
		);
	}
}
