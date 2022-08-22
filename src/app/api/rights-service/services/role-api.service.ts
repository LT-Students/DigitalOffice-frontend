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

import { CreateRoleRequest } from '../models/create-role-request';
import { FindResultResponseRoleInfo } from '../models/find-result-response-role-info';
import { OperationResultResponse } from '../models/operation-result-response';
import { OperationResultResponseRoleResponse } from '../models/operation-result-response-role-response';
import { UpdateRoleRightsRequest } from '../models/update-role-rights-request';

@Injectable({
  providedIn: 'root',
})
export class RoleApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findRoles
   */
  static readonly FindRolesPath = '/roles/find';

  /**
   * Returns all roles information with pagination.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findRoles()` instead.
   *
   * This method doesn't expect any request body.
   */
  findRoles$Response(params: {

    /**
     * Localization of rights.
     */
    locale?: string;

    /**
     * Include deactivated roles
     */
    includeDeactivated?: boolean;

    /**
     * Number of entries to skip
     */
    skipCount: number;

    /**
     * Number of roles on one page.
     */
    takeCount: number;
  }): Observable<StrictHttpResponse<FindResultResponseRoleInfo>> {

    const rb = new RequestBuilder(this.rootUrl, RoleApiService.FindRolesPath, 'get');
    if (params) {
      rb.query('locale', params.locale, {});
      rb.query('includeDeactivated', params.includeDeactivated, {});
      rb.query('skipCount', params.skipCount, {});
      rb.query('takeCount', params.takeCount, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FindResultResponseRoleInfo>;
      })
    );
  }

  /**
   * Returns all roles information with pagination.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findRoles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findRoles(params: {

    /**
     * Localization of rights.
     */
    locale?: string;

    /**
     * Include deactivated roles
     */
    includeDeactivated?: boolean;

    /**
     * Number of entries to skip
     */
    skipCount: number;

    /**
     * Number of roles on one page.
     */
    takeCount: number;
  }): Observable<FindResultResponseRoleInfo> {

    return this.findRoles$Response(params).pipe(
      map((r: StrictHttpResponse<FindResultResponseRoleInfo>) => r.body as FindResultResponseRoleInfo)
    );
  }

  /**
   * Path part for operation getRole
   */
  static readonly GetRolePath = '/roles/get';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRole()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRole$Response(params: {
    roleId: string;
  }): Observable<StrictHttpResponse<OperationResultResponseRoleResponse>> {

    const rb = new RequestBuilder(this.rootUrl, RoleApiService.GetRolePath, 'get');
    if (params) {
      rb.query('roleId', params.roleId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OperationResultResponseRoleResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRole$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRole(params: {
    roleId: string;
  }): Observable<OperationResultResponseRoleResponse> {

    return this.getRole$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponseRoleResponse>) => r.body as OperationResultResponseRoleResponse)
    );
  }

  /**
   * Path part for operation createRole
   */
  static readonly CreateRolePath = '/roles/create';

  /**
   * The method attempts to create the role. The user must be admin.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createRole()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createRole$Response(params: {
    body: CreateRoleRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, RoleApiService.CreateRolePath, 'post');
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
   * The method attempts to create the role. The user must be admin.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createRole$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createRole(params: {
    body: CreateRoleRequest
  }): Observable<OperationResultResponse> {

    return this.createRole$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation editRoleStatus
   */
  static readonly EditRoleStatusPath = '/roles/editstatus';

  /**
   * The method attempts to change role's status. The user must be admin.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editRoleStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  editRoleStatus$Response(params: {
    roleId: string;
    isActive: boolean;
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, RoleApiService.EditRoleStatusPath, 'put');
    if (params) {
      rb.query('roleId', params.roleId, {});
      rb.query('isActive', params.isActive, {});
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
   * The method attempts to change role's status. The user must be admin.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editRoleStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  editRoleStatus(params: {
    roleId: string;
    isActive: boolean;
  }): Observable<OperationResultResponse> {

    return this.editRoleStatus$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

  /**
   * Path part for operation editRoleRights
   */
  static readonly EditRoleRightsPath = '/roles/updaterightsset';

  /**
   * The method attempts to update the role's rights set. The user must be admin.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editRoleRights()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editRoleRights$Response(params: {
    body: UpdateRoleRightsRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, RoleApiService.EditRoleRightsPath, 'post');
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
   * The method attempts to update the role's rights set. The user must be admin.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editRoleRights$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editRoleRights(params: {
    body: UpdateRoleRightsRequest
  }): Observable<OperationResultResponse> {

    return this.editRoleRights$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
