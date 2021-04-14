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
  rootUrl: string = 'http://ltdo.xyz:9802';
}

/**
 * Parameters for `UserApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
