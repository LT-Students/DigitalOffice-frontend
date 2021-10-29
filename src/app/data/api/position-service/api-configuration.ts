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
	rootUrl: string = 'https://company.ltdo.xyz';
}

/**
 * Parameters for `PositionApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
	rootUrl?: string;
}
