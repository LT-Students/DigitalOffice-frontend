/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { FileApiService } from './services/file-api.service';
import { ImageApiService } from './services/image-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    FileApiService,
    ImageApiService,
    ApiConfiguration
  ],
})
export class FileApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<FileApiModule> {
    return {
      ngModule: FileApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: FileApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('FileApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}