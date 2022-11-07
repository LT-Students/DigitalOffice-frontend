/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { RubricApiService } from './services/rubric-api.service';
import { ArticleApiService } from './services/article-api.service';
import { FileApiService } from './services/file-api.service';
import { WikiTreeApiService } from './services/wiki-tree-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	providers: [RubricApiService, ArticleApiService, FileApiService, WikiTreeApiService, ApiConfiguration],
})
export class WikiApiModule {
	static forRoot(params: ApiConfigurationParams): ModuleWithProviders<WikiApiModule> {
		return {
			ngModule: WikiApiModule,
			providers: [
				{
					provide: ApiConfiguration,
					useValue: params,
				},
			],
		};
	}

	constructor(@Optional() @SkipSelf() parentModule: WikiApiModule, @Optional() http: HttpClient) {
		if (parentModule) {
			throw new Error('WikiApiModule is already loaded. Import in your base AppModule only.');
		}
		if (!http) {
			throw new Error(
				'You need to import the HttpClientModule in your AppModule! \n' +
					'See also https://github.com/angular/angular/issues/20575'
			);
		}
	}
}
