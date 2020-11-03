//#region libraries import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//#endregion

//#region project import
import { ApiModule as UserServiceApiModule } from './user-service';
import { ApiModule as CompanyServiceApiModule } from './company-service';
import { ApiModule as ProjectServiceApiModule } from './project-service';
import { ApiModule as AuthenticationServiceApiModule } from './auth-service';
import { ApiModule as TimeManagmentApiModule } from './time-managment-service';
import { ApiModule as FileApiModule } from './file-service';
import { ApiModule as CheckRightsApiModule } from './check-rights-service';
//#endregion

@NgModule({
  imports: [
    CommonModule,
    UserServiceApiModule,
    CompanyServiceApiModule,
    AuthenticationServiceApiModule,
    ProjectServiceApiModule,
    TimeManagmentApiModule,
    FileApiModule,
    CheckRightsApiModule
  ],
  exports: [
    UserServiceApiModule,
    AuthenticationServiceApiModule,
    CompanyServiceApiModule,
    ProjectServiceApiModule,
    TimeManagmentApiModule,
    FileApiModule,
    CheckRightsApiModule
  ]
})
export class ApiModule {}
