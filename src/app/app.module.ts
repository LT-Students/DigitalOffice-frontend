import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SelectProjectComponent} from './select/select-project.component';
import {SelectTagComponent} from './select-tag/select-tag.component';
import { SelectProjectStatusComponent} from './select-projectStatus/select-projectStatus.component';
import {SelectDepartmentComponent} from './select-department/select-department.component';
import {SelectSpecializationComponent} from './select-specialization/select-specialization.component';
import {SelectNameComponent} from './select-name/select-name.component';
import {SelectLevelComponent} from './select-level/select-level.component';
import {SelectRoleComponent} from './select-role/select-role.component';
import {SelectStatusComponent} from './select-status/select-status.component';
import {SelectMonthComponent} from './select-month/select-month.component';
import {SelectProjectOnWorkComponent} from './select-project-on-work/select-project-on-work.component';
import {SelectWeekComponent} from './select-week/select-week.component';
import {SelectRoleDisabledComponent} from './select-role/select-role-disabled.component';
import {SelectYearComponent} from './select-year/select-year.component';
import {SelectWeekDisabledComponent} from './select-week/select-week-disabled.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectProjectComponent,
    SelectTagComponent,
    SelectProjectStatusComponent,
    SelectDepartmentComponent,
    SelectSpecializationComponent,
    SelectNameComponent,
    SelectLevelComponent,
    SelectRoleComponent,
    SelectStatusComponent,
    SelectMonthComponent,
    SelectProjectOnWorkComponent,
    SelectWeekComponent,
    SelectRoleDisabledComponent,
    SelectYearComponent,
    SelectWeekDisabledComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
