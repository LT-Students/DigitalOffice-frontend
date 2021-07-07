/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { UserApiService } from './services/user-api.service';
import { CredentialsApiService } from './services/credentials-api.service';
import { EducationApiService } from './services/education-api.service';
import { CertificateApiService } from './services/certificate-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    UserApiService,
    CredentialsApiService,
    EducationApiService,
    CertificateApiService,
    ApiConfiguration
  ],
})
export class UserApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<UserApiModule> {
    return {
      ngModule: UserApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: UserApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('UserApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
