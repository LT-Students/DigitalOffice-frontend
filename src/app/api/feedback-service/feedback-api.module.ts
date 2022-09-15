/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { FeedbackApiService } from './services/feedback-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	providers: [FeedbackApiService, ApiConfiguration],
})
export class FeedbackApiModule {
	static forRoot(params: ApiConfigurationParams): ModuleWithProviders<FeedbackApiModule> {
		return {
			ngModule: FeedbackApiModule,
			providers: [
				{
					provide: ApiConfiguration,
					useValue: params,
				},
			],
		};
	}

	constructor(@Optional() @SkipSelf() parentModule: FeedbackApiModule, @Optional() http: HttpClient) {
		if (parentModule) {
			throw new Error('FeedbackApiModule is already loaded. Import in your base AppModule only.');
		}
		if (!http) {
			throw new Error(
				'You need to import the HttpClientModule in your AppModule! \n' +
					'See also https://github.com/angular/angular/issues/20575'
			);
		}
	}
}
