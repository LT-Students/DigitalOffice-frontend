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
  rootUrl: string = 'https://filter.ltdo.xyz';
}

/**
 * Parameters for `FilterApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
