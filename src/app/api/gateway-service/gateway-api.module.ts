/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AdminApiService } from './services/admin-api.service';
import { AuthApiService } from './services/auth-api.service';
import { GraphicalUserInterfaceApiService } from './services/graphical-user-interface-api.service';
import { ModuleSettingApiService } from './services/module-setting-api.service';
import { UnsentEmailApiService } from './services/unsent-email-api.service';
import { FeedbackApiService } from './services/feedback-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	providers: [
		AdminApiService,
		AuthApiService,
		GraphicalUserInterfaceApiService,
		ModuleSettingApiService,
		UnsentEmailApiService,
		FeedbackApiService,
		ApiConfiguration,
	],
})
export class GatewayApiModule {
	static forRoot(params: ApiConfigurationParams): ModuleWithProviders<GatewayApiModule> {
		return {
			ngModule: GatewayApiModule,
			providers: [
				{
					provide: ApiConfiguration,
					useValue: params,
				},
			],
		};
	}

	constructor(@Optional() @SkipSelf() parentModule: GatewayApiModule, @Optional() http: HttpClient) {
		if (parentModule) {
			throw new Error('GatewayApiModule is already loaded. Import in your base AppModule only.');
		}
		if (!http) {
			throw new Error(
				'You need to import the HttpClientModule in your AppModule! \n' +
					'See also https://github.com/angular/angular/issues/20575'
			);
		}
	}
}
