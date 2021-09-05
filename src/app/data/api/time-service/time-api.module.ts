/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { LeaveTimeApiService } from './services/leave-time-api.service';
import { WorkTimeApiService } from './services/work-time-api.service';
import { WorkTimeMonthLimitApiService } from './services/work-time-month-limit-api.service';
import { WorkTimeDayJobApiService } from './services/work-time-day-job-api.service';
import { WorkTimeDayJobIdApiService } from './services/work-time-day-job-id-api.service';
import { ImportApiService } from './services/import-api.service';
import { StatApiService } from './services/stat-api.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    LeaveTimeApiService,
    WorkTimeApiService,
    WorkTimeMonthLimitApiService,
    WorkTimeDayJobApiService,
    WorkTimeDayJobIdApiService,
    ImportApiService,
    StatApiService,
    ApiConfiguration
  ],
})
export class TimeApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<TimeApiModule> {
    return {
      ngModule: TimeApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: TimeApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('TimeApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
