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
  rootUrl: string = 'https://localhost:9801/api/user';
}

/**
 * Parameters for `UserApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
