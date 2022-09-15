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
  rootUrl: string = 'https://office.ltdo.xyz';
}

/**
 * Parameters for `OfficeApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
