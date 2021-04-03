import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { ButtonComponent } from './component/button/button.component';
import { SelectComponent } from './component/select/select.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProfileImageComponent } from './component/profile-image/profile-image.component';
import { ContentContainerComponent } from './component/content-container/content-container.component';
import { SearchComponent } from './component/search/search.component';
import { HeaderComponent } from './component/header/header.component';
import { InputComponent } from './component/input/input.component';
import { DatepickerComponent } from './component/datepicker/datepicker.component';

@NgModule({
  declarations: [
    ButtonComponent,
    SelectComponent,
    DashboardComponent,
    ProfileImageComponent,
    ContentContainerComponent,
    SearchComponent,
    HeaderComponent,
    InputComponent,
    DatepickerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DashboardComponent,
    ProfileImageComponent,
    SearchComponent,
    HeaderComponent,
    DatepickerComponent,
    MaterialModule,
  ],
})
export class SharedModule {}
