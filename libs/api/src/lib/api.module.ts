//#region libraries import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//#endregion

//#region project import
import { ApiModule as UserServiceApiModule } from './user-service';
import { ApiModule as CompanyServiceApiModule } from './company-service';
import { ApiModule as ProjectServiceApiModule } from './project-service';
import { ApiModule as AuthenticationServiceApiModule } from './auth-service';
//#endregion

@NgModule({
  imports: [
    CommonModule,
    UserServiceApiModule,
    CompanyServiceApiModule,
    AuthenticationServiceApiModule,
    ProjectServiceApiModule
  ],
  exports: [
    UserServiceApiModule,
    AuthenticationServiceApiModule,
    CompanyServiceApiModule,
    ProjectServiceApiModule
  ]
})
export class ApiModule {}
