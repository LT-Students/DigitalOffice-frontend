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
  rootUrl: string = 'https://news.ltdo.xyz';
}

/**
 * Parameters for `NewsApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
