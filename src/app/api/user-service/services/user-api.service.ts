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

import { CreateUserRequest } from '../models/create-user-request';
import { EditUserActiveRequest } from '../models/edit-user-active-request';
import { EditUserRequest } from '../models/edit-user-request';
import { FindResultResponseUserInfo } from '../models/find-result-response-user-info';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseUserResponse } from '../models/operation-result-response-user-response';

@Injectable({
	providedIn: 'root',
})
export class UserApiService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

	/**
	 * Path part for operation createUser
	 */
	static readonly CreateUserPath = '/user/create';

	/**
	 * The method attempts to add the user. The user must have right - Add/Edit/Remove users.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createUser()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createUser$Response(params: { body: CreateUserRequest }): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, UserApiService.CreateUserPath, 'post');
		if (params) {
			rb.body(params.body, 'application/json');
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
					return r as StrictHttpResponse<OperationResultResponse>;
				})
			);
	}

	/**
	 * The method attempts to add the user. The user must have right - Add/Edit/Remove users.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `createUser$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createUser(params: { body: CreateUserRequest }): Observable<OperationResultResponse> {
		return this.createUser$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation editUserActive
	 */
	static readonly EditUserActivePath = '/user/editactive';

	/**
	 * Change is active user status. The user must have right - Add/Edit/Remove users.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editUserActive()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editUserActive$Response(params?: {
		body?: EditUserActiveRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, UserApiService.EditUserActivePath, 'put');
		if (params) {
			rb.body(params.body, 'application/json');
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
					return r as StrictHttpResponse<OperationResultResponse>;
				})
			);
	}

	/**
	 * Change is active user status. The user must have right - Add/Edit/Remove users.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editUserActive$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editUserActive(params?: { body?: EditUserActiveRequest }): Observable<OperationResultResponse> {
		return this.editUserActive$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation editUser
	 */
	static readonly EditUserPath = '/user/edit';

	/**
	 * Update user properties. The user must have right - Add/Edit/Remove users.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `editUser()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editUser$Response(params: {
		/**
		 * Specific user id
		 */
		userId: string;
		body?: EditUserRequest;
	}): Observable<StrictHttpResponse<OperationResultResponse>> {
		const rb = new RequestBuilder(this.rootUrl, UserApiService.EditUserPath, 'patch');
		if (params) {
			rb.query('userId', params.userId, {});
			rb.body(params.body, 'application/json');
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
					return r as StrictHttpResponse<OperationResultResponse>;
				})
			);
	}

	/**
	 * Update user properties. The user must have right - Add/Edit/Remove users.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `editUser$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	editUser(params: {
		/**
		 * Specific user id
		 */
		userId: string;
		body?: EditUserRequest;
	}): Observable<OperationResultResponse> {
		return this.editUser$Response(params).pipe(
			map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
		);
	}

	/**
	 * Path part for operation getUser
	 */
	static readonly GetUserPath = '/user/get';

	/**
	 * Returns user information.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getUser()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getUser$Response(params?: {
		/**
		 * User global unique identifier.
		 */
		userId?: string;

		/**
		 * Any of user emails. Can not be used with &#x60;includecommunications&#x60;.
		 */
		email?: string;

		/**
		 * Include user current avatar in answer.
		 */
		includecurrentavatar?: boolean;

		/**
		 * Include all user current avatars in answer.
		 */
		includeavatars?: boolean;

		/**
		 * Include user communications info in answer.
		 */
		includecommunications?: boolean;

		/**
		 * Include user company info in answer.
		 */
		includecompany?: boolean;

		/**
		 * Include user department info in answer.
		 */
		includedepartment?: boolean;

		/**
		 * Include user office info in answer.
		 */
		includeoffice?: boolean;

		/**
		 * Include user position info in answer.
		 */
		includeposition?: boolean;

		/**
		 * Include user role info in answer.
		 */
		includerole?: boolean;

		/**
		 * Role localization.
		 */
		locale?: string;
	}): Observable<StrictHttpResponse<OperationResultResponseUserResponse>> {
		const rb = new RequestBuilder(this.rootUrl, UserApiService.GetUserPath, 'get');
		if (params) {
			rb.query('userId', params.userId, {});
			rb.query('email', params.email, {});
			rb.query('includecurrentavatar', params.includecurrentavatar, {});
			rb.query('includeavatars', params.includeavatars, {});
			rb.query('includecommunications', params.includecommunications, {});
			rb.query('includecompany', params.includecompany, {});
			rb.query('includedepartment', params.includedepartment, {});
			rb.query('includeoffice', params.includeoffice, {});
			rb.query('includeposition', params.includeposition, {});
			rb.query('includerole', params.includerole, {});
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
					return r as StrictHttpResponse<OperationResultResponseUserResponse>;
				})
			);
	}

	/**
	 * Returns user information.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `getUser$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getUser(params?: {
		/**
		 * User global unique identifier.
		 */
		userId?: string;

		/**
		 * Any of user emails. Can not be used with &#x60;includecommunications&#x60;.
		 */
		email?: string;

		/**
		 * Include user current avatar in answer.
		 */
		includecurrentavatar?: boolean;

		/**
		 * Include all user current avatars in answer.
		 */
		includeavatars?: boolean;

		/**
		 * Include user communications info in answer.
		 */
		includecommunications?: boolean;

		/**
		 * Include user company info in answer.
		 */
		includecompany?: boolean;

		/**
		 * Include user department info in answer.
		 */
		includedepartment?: boolean;

		/**
		 * Include user office info in answer.
		 */
		includeoffice?: boolean;

		/**
		 * Include user position info in answer.
		 */
		includeposition?: boolean;

		/**
		 * Include user role info in answer.
		 */
		includerole?: boolean;

		/**
		 * Role localization.
		 */
		locale?: string;
	}): Observable<OperationResultResponseUserResponse> {
		return this.getUser$Response(params).pipe(
			map(
				(r: StrictHttpResponse<OperationResultResponseUserResponse>) =>
					r.body as OperationResultResponseUserResponse
			)
		);
	}

	/**
	 * Path part for operation findUsers
	 */
	static readonly FindUsersPath = '/user/find';

	/**
	 * Returns all users information with pagination.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `findUsers()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findUsers$Response(params: {
		/**
		 * Number of entries to skip.
		 */
		skipCount: number;

		/**
		 * Number of users to take.
		 */
		takeCount: number;

		/**
		 * When value is &#x27;true&#x27; sorts A-Z, when value is &#x27;false&#x27; sorts Z-A
		 */
		isascendingsort?: boolean;

		/**
		 * Find for users containing a substring in the full name
		 */
		fullnameincludesubstring?: string;
		isactive?: boolean;
		ispending?: boolean;
		includecurrentavatar?: boolean;
		includecommunications?: boolean;
	}): Observable<StrictHttpResponse<FindResultResponseUserInfo>> {
		const rb = new RequestBuilder(this.rootUrl, UserApiService.FindUsersPath, 'get');
		if (params) {
			rb.query('skipCount', params.skipCount, {});
			rb.query('takeCount', params.takeCount, {});
			rb.query('isascendingsort', params.isascendingsort, {});
			rb.query('fullnameincludesubstring', params.fullnameincludesubstring, {});
			rb.query('isactive', params.isactive, {});
			rb.query('ispending', params.ispending, {});
			rb.query('includecurrentavatar', params.includecurrentavatar, {});
			rb.query('includecommunications', params.includecommunications, {});
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
					return r as StrictHttpResponse<FindResultResponseUserInfo>;
				})
			);
	}

	/**
	 * Returns all users information with pagination.
	 *
	 * This method provides access to only to the response body.
	 * To access the full response (for headers, for example), `findUsers$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	findUsers(params: {
		/**
		 * Number of entries to skip.
		 */
		skipCount: number;

		/**
		 * Number of users to take.
		 */
		takeCount: number;

		/**
		 * When value is &#x27;true&#x27; sorts A-Z, when value is &#x27;false&#x27; sorts Z-A
		 */
		isascendingsort?: boolean;

		/**
		 * Find for users containing a substring in the full name
		 */
		fullnameincludesubstring?: string;
		isactive?: boolean;
		ispending?: boolean;
		includecurrentavatar?: boolean;
		includecommunications?: boolean;
	}): Observable<FindResultResponseUserInfo> {
		return this.findUsers$Response(params).pipe(
			map((r: StrictHttpResponse<FindResultResponseUserInfo>) => r.body as FindResultResponseUserInfo)
		);
	}
}
