/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { EducationApiService } from './services/education-api.service';
import { CertificateApiService } from './services/certificate-api.service';
import { ImageApiService } from './services/image-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	providers: [EducationApiService, CertificateApiService, ImageApiService, ApiConfiguration],
})
export class EducationApiModule {
	static forRoot(params: ApiConfigurationParams): ModuleWithProviders<EducationApiModule> {
		return {
			ngModule: EducationApiModule,
			providers: [
				{
					provide: ApiConfiguration,
					useValue: params,
				},
			],
		};
	}

	constructor(@Optional() @SkipSelf() parentModule: EducationApiModule, @Optional() http: HttpClient) {
		if (parentModule) {
			throw new Error('EducationApiModule is already loaded. Import in your base AppModule only.');
		}
		if (!http) {
			throw new Error(
				'You need to import the HttpClientModule in your AppModule! \n' +
					'See also https://github.com/angular/angular/issues/20575'
			);
		}
	}
}
