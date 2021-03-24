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
  rootUrl: string = 'https://84.201.146.123:9817/api/auth';
}

/**
 * Parameters for `AuthenticationApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
