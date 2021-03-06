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
  rootUrl: string = 'https://localhost:9805/api';
}

/**
 * Parameters for `TimeManagementApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
