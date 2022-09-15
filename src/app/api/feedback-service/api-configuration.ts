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
	rootUrl: string = 'https://feedback.ltdo.xyz';
}

/**
 * Parameters for `FeedbackApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
	rootUrl?: string;
}
