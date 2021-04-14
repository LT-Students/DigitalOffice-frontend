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
  rootUrl: string = 'http://ltdo.xyz:9804';
}

/**
 * Parameters for `ProjectApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
