/**
 * CompanyService
 * CompanyService is an API that intended to work with positions, companies and departments. -
 *
 * OpenAPI spec version: 1.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { AddPositionRequest } from '../model/addPositionRequest';
import { EditPositionRequest } from '../model/editPositionRequest';
import { PositionResponse } from '../model/positionResponse';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class PositionService {

    protected basePath = 'https://localhost:9815/api';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * Adds a new position.
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public positionAddPositionPost(body: AddPositionRequest, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public positionAddPositionPost(body: AddPositionRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public positionAddPositionPost(body: AddPositionRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public positionAddPositionPost(body: AddPositionRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling positionAddPositionPost.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<string>('post',`${this.basePath}/position/addPosition`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Deletes the specified position.
     * @param positionId Position global unique identifier.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public positionDisablePositionByIdDelete(positionId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public positionDisablePositionByIdDelete(positionId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public positionDisablePositionByIdDelete(positionId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public positionDisablePositionByIdDelete(positionId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (positionId === null || positionId === undefined) {
            throw new Error('Required parameter positionId was null or undefined when calling positionDisablePositionByIdDelete.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (positionId !== undefined && positionId !== null) {
            queryParameters = queryParameters.set('positionId', <any>positionId);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/position/disablePositionById`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Edits a specified position.
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public positionEditPositionPut(body: EditPositionRequest, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public positionEditPositionPut(body: EditPositionRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public positionEditPositionPut(body: EditPositionRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public positionEditPositionPut(body: EditPositionRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling positionEditPositionPut.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('put',`${this.basePath}/position/editPosition`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Returns position by id.
     * @param positionId Position global unique identifier.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public positionGetPositionByIdGet(positionId: string, observe?: 'body', reportProgress?: boolean): Observable<PositionResponse>;
    public positionGetPositionByIdGet(positionId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PositionResponse>>;
    public positionGetPositionByIdGet(positionId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PositionResponse>>;
    public positionGetPositionByIdGet(positionId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (positionId === null || positionId === undefined) {
            throw new Error('Required parameter positionId was null or undefined when calling positionGetPositionByIdGet.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (positionId !== undefined && positionId !== null) {
            queryParameters = queryParameters.set('positionId', <any>positionId);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<PositionResponse>('get',`${this.basePath}/position/getPositionById`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Returns all added positions.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public positionGetPositionsListGet(observe?: 'body', reportProgress?: boolean): Observable<Array<PositionResponse>>;
    public positionGetPositionsListGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<PositionResponse>>>;
    public positionGetPositionsListGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<PositionResponse>>>;
    public positionGetPositionsListGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<PositionResponse>>('get',`${this.basePath}/position/getPositionsList`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
