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
	rootUrl: string = 'https://wiki.ltdo.xyz';
}

/**
 * Parameters for `WikiApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
	rootUrl?: string;
}
