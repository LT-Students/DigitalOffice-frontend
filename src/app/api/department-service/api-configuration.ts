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
  rootUrl: string = 'https://department.ltdo.xyz';
}

/**
 * Parameters for `DepartmentApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
