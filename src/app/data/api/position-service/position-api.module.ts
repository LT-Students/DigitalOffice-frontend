/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { PositionApiService } from './services/position-api.service';
import { PositionUserApiService } from './services/position-user-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	providers: [PositionApiService, PositionUserApiService, ApiConfiguration],
})
export class PositionApiModule {
	static forRoot(params: ApiConfigurationParams): ModuleWithProviders<PositionApiModule> {
		return {
			ngModule: PositionApiModule,
			providers: [
				{
					provide: ApiConfiguration,
					useValue: params,
				},
			],
		};
	}

	constructor(@Optional() @SkipSelf() parentModule: PositionApiModule, @Optional() http: HttpClient) {
		if (parentModule) {
			throw new Error('PositionApiModule is already loaded. Import in your base AppModule only.');
		}
		if (!http) {
			throw new Error(
				'You need to import the HttpClientModule in your AppModule! \n' +
					'See also https://github.com/angular/angular/issues/20575'
			);
		}
	}
}
