/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { PositionApiService } from './services/position-api.service';
import { DepartmentApiService } from './services/department-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    PositionApiService,
    DepartmentApiService,
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
