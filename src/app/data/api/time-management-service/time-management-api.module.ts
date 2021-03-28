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

import { LeaveTimeApiService } from './services/leave-time-api.service';
import { WorkTimeApiService } from './services/work-time-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [LeaveTimeApiService, WorkTimeApiService, ApiConfiguration],
})
export class TimeManagementApiModule {
  static forRoot(
    params: ApiConfigurationParams
  ): ModuleWithProviders<TimeManagementApiModule> {
    return {
      ngModule: TimeManagementApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params,
        },
      ],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: TimeManagementApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error(
        'TimeManagementApiModule is already loaded. Import in your base AppModule only.'
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
