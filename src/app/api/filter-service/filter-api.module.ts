/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { FilterUserApiService } from './services/filter-user-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    FilterUserApiService,
    ApiConfiguration
  ],
})
export class FilterApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<FilterApiModule> {
    return {
      ngModule: FilterApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: FilterApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('FilterApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
