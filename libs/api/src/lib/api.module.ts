//#region libraries import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//#endregion

//#region project import
import { ApiModule as UserServiceApiModule } from './user-service';
//#endregion

@NgModule({
  imports: [
    CommonModule,
    UserServiceApiModule
  ],
  exports: [
    UserServiceApiModule,
  ]
})
export class ApiModule {}
