/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { MessageApiService } from './services/message-api.service';
import { WorkspaceApiService } from './services/workspace-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
	imports: [],
	exports: [],
	declarations: [],
	providers: [MessageApiService, WorkspaceApiService, ApiConfiguration],
})
export class MessageApiModule {
	static forRoot(params: ApiConfigurationParams): ModuleWithProviders<MessageApiModule> {
		return {
			ngModule: MessageApiModule,
			providers: [
				{
					provide: ApiConfiguration,
					useValue: params,
				},
			],
		};
	}

	constructor(@Optional() @SkipSelf() parentModule: MessageApiModule, @Optional() http: HttpClient) {
		if (parentModule) {
			throw new Error('MessageApiModule is already loaded. Import in your base AppModule only.');
		}
		if (!http) {
			throw new Error(
				'You need to import the HttpClientModule in your AppModule! \n' +
					'See also https://github.com/angular/angular/issues/20575'
			);
		}
	}
}
