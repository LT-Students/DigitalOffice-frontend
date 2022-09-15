/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { CompanyApiService } from './services/company-api.service';
import { CompanyUserApiService } from './services/company-user-api.service';
import { ContractSubjectApiService } from './services/contract-subject-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    CompanyApiService,
    CompanyUserApiService,
    ContractSubjectApiService,
    ApiConfiguration
  ],
})
export class CompanyApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<CompanyApiModule> {
    return {
      ngModule: CompanyApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: CompanyApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('CompanyApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
