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
	rootUrl: string = 'https://image.ltdo.xyz';
}

/**
 * Parameters for `ImageApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
	rootUrl?: string;
}
