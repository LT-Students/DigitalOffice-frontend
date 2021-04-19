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
  rootUrl: string = 'https://project.ltdo.xyz';
}

/**
 * Parameters for `ProjectApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
