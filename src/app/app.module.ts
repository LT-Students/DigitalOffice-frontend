import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SelectComponent } from './select/select.component';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DateDescComponent } from './date-desc/date-desc.component';
import { ButtonComponent } from './button/button.component';
import { TagsBlockComponent } from './tags-block/tags-block.component';
import { LOCALE_ID} from '@angular/core';
import { registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

import { AppRoutingModule } from './app-routing.module';
import { AttendanceComponent } from './attendance/attendance.component';
import { ChartComponent } from './chart/chart.component';
import { AddHoursComponent } from './add-hours/add-hours.component';
import { GradientGraphicsComponent } from './gradient-graphics/gradient-graphics.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AttendanceService } from './attendance/attendance.service';


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
    GradientGraphicsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RouterModule,
    NgbModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru-RU'},
    AttendanceService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
