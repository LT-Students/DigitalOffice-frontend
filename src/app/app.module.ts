import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { ApiModule } from '../../libs/api/src/lib/api.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { AttendanceService } from './modules/employee/components/attendance/attendance.service';
import { AdminModule } from './modules/admin/admin.module';
import { AppMaterialModule } from './app-material.module';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ApiModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    SharedModule,
    EmployeeModule,
    AdminModule,
    NgbModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    LocalStorageService,
    AttendanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'ru-RU' }
  ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
}
