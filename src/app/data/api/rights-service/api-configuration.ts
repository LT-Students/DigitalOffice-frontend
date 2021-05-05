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
  rootUrl: string = 'https://rights.ltdo.xyz';
}

/**
 * Parameters for `RightsApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
