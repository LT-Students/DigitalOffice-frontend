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
	rootUrl: string = 'https://admin.ltdo.xyz';
}

/**
 * Parameters for `AdminApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
	rootUrl?: string;
}
