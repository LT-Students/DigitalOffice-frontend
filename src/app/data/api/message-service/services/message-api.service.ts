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

import { EditEmailTemplateRequest } from '../models/edit-email-template-request';
import { EmailTemplateRequest } from '../models/email-template-request';

@Injectable({
  providedIn: 'root',
})
export class MessageApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation addEmailTemplate
   */
  static readonly AddEmailTemplatePath = '/email/addEmailTemplate';

  /**
   * Adds new email template and returns its Id.
   * * __The user must have access to the right__ -- Add/Edit/Remove templates.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addEmailTemplate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEmailTemplate$Response(params: {
    body: EmailTemplateRequest
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, MessageApiService.AddEmailTemplatePath, 'post');
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
   * Adds new email template and returns its Id.
   * * __The user must have access to the right__ -- Add/Edit/Remove templates.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addEmailTemplate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEmailTemplate(params: {
    body: EmailTemplateRequest
  }): Observable<string> {

    return this.addEmailTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation removeEmailTemplate
   */
  static readonly RemoveEmailTemplatePath = '/email/removeEmailTemplate';

  /**
   * Deletes email template.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeEmailTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeEmailTemplate$Response(params: {

    /**
     * Email template global unique identifier.
     */
    emailTemplateId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, MessageApiService.RemoveEmailTemplatePath, 'get');
    if (params) {
      rb.query('emailTemplateId', params.emailTemplateId, {});
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
   * Deletes email template.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeEmailTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeEmailTemplate(params: {

    /**
     * Email template global unique identifier.
     */
    emailTemplateId: string;
  }): Observable<void> {

    return this.removeEmailTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation editEmailTemplate
   */
  static readonly EditEmailTemplatePath = '/email/editEmailTemplate';

  /**
   * Changes email templait.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editEmailTemplate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editEmailTemplate$Response(params: {
    body: EditEmailTemplateRequest
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, MessageApiService.EditEmailTemplatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * Changes email templait.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editEmailTemplate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editEmailTemplate(params: {
    body: EditEmailTemplateRequest
  }): Observable<void> {

    return this.editEmailTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
