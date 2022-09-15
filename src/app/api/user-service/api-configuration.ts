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
  rootUrl: string = 'https://user.ltdo.xyz';
}

/**
 * Parameters for `UserApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
