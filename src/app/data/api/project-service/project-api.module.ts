/* tslint:disable */
/* eslint-disable */
import {
  NgModule,
  ModuleWithProviders,
  SkipSelf,
  Optional,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { ProjectApiService } from './services/project-api.service';
import { UserApiService } from './services/user-api.service';
import { RoleApiService } from './services/role-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ProjectApiService,
    UserApiService,
    RoleApiService,
    ApiConfiguration,
  ],
})
export class ProjectApiModule {
  static forRoot(
    params: ApiConfigurationParams
  ): ModuleWithProviders<ProjectApiModule> {
    return {
      ngModule: ProjectApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params,
        },
      ],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: ProjectApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error(
        'ProjectApiModule is already loaded. Import in your base AppModule only.'
      );
    }
    if (!http) {
      throw new Error(
        'You need to import the HttpClientModule in your AppModule! \n' +
          'See also https://github.com/angular/angular/issues/20575'
      );
    }
  }
}
