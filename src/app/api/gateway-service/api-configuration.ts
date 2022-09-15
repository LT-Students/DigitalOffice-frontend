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
	rootUrl: string = 'https://gateway.ltdo.xyz';
}

/**
 * Parameters for `GatewayApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
	rootUrl?: string;
}
