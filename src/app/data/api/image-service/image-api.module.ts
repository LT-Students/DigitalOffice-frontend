/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { ImagemessageApiService } from './services/imagemessage-api.service';
import { ImageProjectApiService } from './services/image-project-api.service';
import { ImageUserApiService } from './services/image-user-api.service';
import { ImageNewsApiService } from './services/image-news-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ImagemessageApiService,
    ImageProjectApiService,
    ImageUserApiService,
    ImageNewsApiService,
    ApiConfiguration
  ],
})
export class ImageApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ImageApiModule> {
    return {
      ngModule: ImageApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ImageApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ImageApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
