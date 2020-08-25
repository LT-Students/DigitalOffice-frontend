import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthModule } from './modules/auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AdminModule } from './modules/admin/admin.module';

import { AppComponent } from './app.component';
import { SelectComponent } from './modules/shared/select/select.component';
import { ToolbarComponent } from './modules/shared/toolbar/toolbar.component';
import { DateDescComponent } from './modules/user-page/components/date-desc/date-desc.component';
import { ButtonComponent } from './modules/shared/button/button.component';
import { TagsBlockComponent } from './modules/user-page/components/tags-block/tags-block.component';
import { AttendanceComponent } from './modules/user-page/components/attendance/attendance.component';
import { ChartComponent } from './modules/user-page/components/chart/chart.component';
import { AddHoursComponent } from './modules/user-page/components/add-hours/add-hours.component';
import { GradientGraphicsComponent } from './modules/user-page/components/gradient-graphics/gradient-graphics.component';
import { UserTasksComponent } from './modules/user-page/components/user-tasks/user-tasks.component';
import { ProjectComponent } from './modules/user-page/components/project/project.component';
import { TaskComponent } from './modules/user-page/components/project/task/task.component';

import { AttendanceService } from './modules/user-page/components/attendance/attendance.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { AuthGuard } from './guards/auth.guard';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { SharedModule } from './modules/shared/shared.module';
import { UserPageModule } from './modules/user-page/user-page.module';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    AdminModule,
    SharedModule,
    UserPageModule,
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {provide: LOCALE_ID, useValue: 'ru-RU'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
