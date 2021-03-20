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
  rootUrl: string = 'https://84.201.146.123:9801/api/user';
}

/**
 * Parameters for `UserApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
