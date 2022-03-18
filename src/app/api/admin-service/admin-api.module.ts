/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AdminApiService } from './services/admin-api.service';
import { GraphicalUserInterfaceApiService } from './services/graphical-user-interface-api.service';
import { ServiceEndpointApiService } from './services/service-endpoint-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	providers: [AdminApiService, GraphicalUserInterfaceApiService, ServiceEndpointApiService, ApiConfiguration],
})
export class AdminApiModule {
	static forRoot(params: ApiConfigurationParams): ModuleWithProviders<AdminApiModule> {
		return {
			ngModule: AdminApiModule,
			providers: [
				{
					provide: ApiConfiguration,
					useValue: params,
				},
			],
		};
	}

	constructor(@Optional() @SkipSelf() parentModule: AdminApiModule, @Optional() http: HttpClient) {
		if (parentModule) {
			throw new Error('AdminApiModule is already loaded. Import in your base AppModule only.');
		}
		if (!http) {
			throw new Error(
				'You need to import the HttpClientModule in your AppModule! \n' +
					'See also https://github.com/angular/angular/issues/20575'
			);
		}
	}
}
