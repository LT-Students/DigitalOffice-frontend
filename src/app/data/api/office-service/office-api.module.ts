/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { OfficeApiService } from './services/office-api.service';
import { CompanyApiService } from './services/company-api.service';
import { UserOfficeApiService } from './services/user-office-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	providers: [OfficeApiService, CompanyApiService, UserOfficeApiService, ApiConfiguration],
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
