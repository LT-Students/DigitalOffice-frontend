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
	rootUrl: string = 'https://position.ltdo.xyz';
}

/**
 * Parameters for `PositionApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
	rootUrl?: string;
}
