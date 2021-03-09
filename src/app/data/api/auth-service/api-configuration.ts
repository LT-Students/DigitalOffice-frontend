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
  rootUrl: string = 'https://localhost:9817/api/authentication';
}

/**
 * Parameters for `AuthenticationApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
