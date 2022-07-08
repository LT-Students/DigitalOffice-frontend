/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { OfficeApiService } from './services/office-api.service';
import { OfficeUsersApiService } from './services/office-users-api.service';
import { WorkspaceApiService } from './services/workspace-api.service';
import { WorkspaceTypeApiService } from './services/workspace-type-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	providers: [
		OfficeApiService,
		OfficeUsersApiService,
		WorkspaceApiService,
		WorkspaceTypeApiService,
		ApiConfiguration,
	],
})
export class OfficeApiModule {
	static forRoot(params: ApiConfigurationParams): ModuleWithProviders<OfficeApiModule> {
		return {
			ngModule: OfficeApiModule,
			providers: [
				{
					provide: ApiConfiguration,
					useValue: params,
				},
			],
		};
	}

	constructor(@Optional() @SkipSelf() parentModule: OfficeApiModule, @Optional() http: HttpClient) {
		if (parentModule) {
			throw new Error('OfficeApiModule is already loaded. Import in your base AppModule only.');
		}
		if (!http) {
			throw new Error(
				'You need to import the HttpClientModule in your AppModule! \n' +
					'See also https://github.com/angular/angular/issues/20575'
			);
		}
	}
}
