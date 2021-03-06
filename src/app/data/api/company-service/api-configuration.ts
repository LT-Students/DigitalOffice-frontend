/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = 'https://localhost:9815/api';
}

/**
 * Parameters for `CompanyApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
