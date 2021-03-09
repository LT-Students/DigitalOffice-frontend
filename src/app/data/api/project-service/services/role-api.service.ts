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
   * Path part for operation disableUserRoleInProject
   */
  static readonly DisableUserRoleInProjectPath = '/role/disableUserRoleInProject';

  /**
   * Remove specific role by id.
   * * __The user must have access right__ -- Add/Edit/Remove project.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disableUserRoleInProject()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableUserRoleInProject$Response(params: {
    roleId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RoleApiService.DisableUserRoleInProjectPath, 'delete');
    if (params) {
      rb.query('roleId', params.roleId, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Remove specific role by id.
   * * __The user must have access right__ -- Add/Edit/Remove project.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `disableUserRoleInProject$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  disableUserRoleInProject(params: {
    roleId: string;
  }): Observable<void> {

    return this.disableUserRoleInProject$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
