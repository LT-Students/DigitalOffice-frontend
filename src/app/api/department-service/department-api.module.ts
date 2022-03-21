/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { DepartmentApiService } from './services/department-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	providers: [DepartmentApiService, ApiConfiguration],
})
export class DepartmentApiModule {
	static forRoot(params: ApiConfigurationParams): ModuleWithProviders<DepartmentApiModule> {
		return {
			ngModule: DepartmentApiModule,
			providers: [
				{
					provide: ApiConfiguration,
					useValue: params,
				},
			],
		};
	}

	constructor(@Optional() @SkipSelf() parentModule: DepartmentApiModule, @Optional() http: HttpClient) {
		if (parentModule) {
			throw new Error('DepartmentApiModule is already loaded. Import in your base AppModule only.');
		}
		if (!http) {
			throw new Error(
				'You need to import the HttpClientModule in your AppModule! \n' +
					'See also https://github.com/angular/angular/issues/20575'
			);
		}
	}
}
