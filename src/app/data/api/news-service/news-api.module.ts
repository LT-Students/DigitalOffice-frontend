/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { NewsApiService } from './services/news-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    NewsApiService,
    ApiConfiguration
  ],
})
export class NewsApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<NewsApiModule> {
    return {
      ngModule: NewsApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: NewsApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('NewsApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
