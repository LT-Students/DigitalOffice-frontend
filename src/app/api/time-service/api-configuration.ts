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
  rootUrl: string = 'https://time.ltdo.xyz';
}

/**
 * Parameters for `TimeApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
