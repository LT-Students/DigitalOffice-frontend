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

import { EditUserRoleRequest } from '../models/edit-user-role-request';
import { OperationResultResponse } from '../models/operation-result-response';

@Injectable({
  providedIn: 'root',
})
export class UserRoleApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation editUserRole
   */
  static readonly EditUserRolePath = '/user/edit';

  /**
   * Chage user role.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editUserRole()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editUserRole$Response(params: {
    body: EditUserRoleRequest
  }): Observable<StrictHttpResponse<OperationResultResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UserRoleApiService.EditUserRolePath, 'put');
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
   * Chage user role.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editUserRole$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editUserRole(params: {
    body: EditUserRoleRequest
  }): Observable<OperationResultResponse> {

    return this.editUserRole$Response(params).pipe(
      map((r: StrictHttpResponse<OperationResultResponse>) => r.body as OperationResultResponse)
    );
  }

}
