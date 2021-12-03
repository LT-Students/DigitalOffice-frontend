/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { MessageImageApiService } from './services/message-image-api.service';
import { ProjectImageApiService } from './services/project-image-api.service';
import { UserImageApiService } from './services/user-image-api.service';
import { NewsImageApiService } from './services/news-image-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	providers: [
		MessageImageApiService,
		ProjectImageApiService,
		UserImageApiService,
		NewsImageApiService,
		ApiConfiguration,
	],
})
export class ImageApiModule {
	static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ImageApiModule> {
		return {
			ngModule: ImageApiModule,
			providers: [
				{
					provide: ApiConfiguration,
					useValue: params,
				},
			],
		};
	}

	constructor(@Optional() @SkipSelf() parentModule: ImageApiModule, @Optional() http: HttpClient) {
		if (parentModule) {
			throw new Error('ImageApiModule is already loaded. Import in your base AppModule only.');
		}
		if (!http) {
			throw new Error(
				'You need to import the HttpClientModule in your AppModule! \n' +
					'See also https://github.com/angular/angular/issues/20575'
			);
		}
	}
}
