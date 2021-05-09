/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { RightsApiService } from './services/rights-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    RightsApiService,
    ApiConfiguration
  ],
})
export class RightsApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<RightsApiModule> {
    return {
      ngModule: RightsApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: RightsApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('RightsApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
