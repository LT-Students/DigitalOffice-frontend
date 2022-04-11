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

import { FindResultResponseUserInfo } from '../models/find-result-response-user-info';

@Injectable({
	providedIn: 'root',
})
export class UserserviceApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation findUsersFromServises
	 */
	static readonly FindUsersFromServisesPath = '/userservice/filter';

	/**
	 * Returns all users data with userIds from services by filter.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findUsersFromServises()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findUsersFromServises$Response(params: {
		/**
		 * Number of entries to skip.
		 */
		skipCount: number;

		/**
		 * Number of users to take.
		 */
		takeCount: number;

		/**
		 * find users by departments&#x27; Ids
		 */
		departmentsIds?: Array<string>;

		/**
		 * find users by positions&#x27; Ids
		 */
		positionIds?: Array<string>;

		/**
		 * find users by rights&#x27; Ids
		 */
		rightsIds?: Array<string>;

		/**
		 * find users by offices&#x27; Ids
		 */
		officesIds?: Array<string>;
	}): Observable<StrictHttpResponse<Array<FindResultResponseUserInfo>>> {
		const rb = new RequestBuilder(this.rootUrl, UserserviceApiService.FindUsersFromServisesPath, 'get');
		if (params) {
			rb.query('skipCount', params.skipCount, {});
			rb.query('takeCount', params.takeCount, {});
			rb.query('departmentsIds', params.departmentsIds, {});
			rb.query('positionIds', params.positionIds, {});
			rb.query('rightsIds', params.rightsIds, {});
			rb.query('officesIds', params.officesIds, {});
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
					return r as StrictHttpResponse<Array<FindResultResponseUserInfo>>;
				})
			);
	}

	/**
	 * Returns all users data with userIds from services by filter.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findUsersFromServises$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findUsersFromServises(params: {
		/**
		 * Number of entries to skip.
		 */
		skipCount: number;

		/**
		 * Number of users to take.
		 */
		takeCount: number;

		/**
		 * find users by departments&#x27; Ids
		 */
		departmentsIds?: Array<string>;

		/**
		 * find users by positions&#x27; Ids
		 */
		positionIds?: Array<string>;

		/**
		 * find users by rights&#x27; Ids
		 */
		rightsIds?: Array<string>;

		/**
		 * find users by offices&#x27; Ids
		 */
		officesIds?: Array<string>;
	}): Observable<Array<FindResultResponseUserInfo>> {
		return this.findUsersFromServises$Response(params).pipe(
			map(
				(r: StrictHttpResponse<Array<FindResultResponseUserInfo>>) =>
					r.body as Array<FindResultResponseUserInfo>
			)
		);
	}
}
