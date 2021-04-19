/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AuthApiService } from './services/auth-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AuthApiService,
    ApiConfiguration
  ],
})
export class AuthenticationApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<AuthenticationApiModule> {
    return {
      ngModule: AuthenticationApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: AuthenticationApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('AuthenticationApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
