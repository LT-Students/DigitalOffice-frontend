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
  rootUrl: string = 'https://message.ltdo.xyz';
}

/**
 * Parameters for `MessageApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
