import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SelectComponent } from './select/select.component';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DateDescComponent } from './date-desc/date-desc.component';
import { ButtonComponent } from './button/button.component';
import { TagsBlockComponent } from './tags-block/tags-block.component';
import { AdminModule } from './admin/admin.module';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

import { AttendanceComponent } from './attendance/attendance.component';
import { ChartComponent } from './chart/chart.component';
import { AddHoursComponent } from './add-hours/add-hours.component';
import { GradientGraphicsComponent } from './gradient-graphics/gradient-graphics.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AttendanceService } from './attendance/attendance.service';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { AuthGuard } from './services/auth.guard';
import { UserTasksComponent } from './user-tasks/user-tasks.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    TagsBlockComponent,
    SelectComponent,
    DateDescComponent,
    ToolbarComponent,
    AttendanceComponent,
    ChartComponent,
    AddHoursComponent,
    GradientGraphicsComponent,
    UserTasksComponent,
    ProjectComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    AdminModule,
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
