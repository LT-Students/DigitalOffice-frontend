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
	rootUrl: string = 'https://education.ltdo.xyz';
}

/**
 * Parameters for `EducationApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
	rootUrl?: string;
}
