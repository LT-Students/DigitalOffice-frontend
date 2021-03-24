import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { ButtonComponent } from './component/button/button.component';
import { SelectComponent } from './component/select/select.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProfileImageComponent } from './component/profile-image/profile-image.component';
import { ContentContainerComponent } from './component/content-container/content-container.component';
import { SearchComponent } from './component/search/search.component';
import { HeaderComponent } from './component/header/header.component';
import { EmployeePageComponent } from './component/employee-page/employee-page.component';
import { EmployeeInfoComponent } from './component/employee-info/employee-info.component';

@NgModule({
  declarations: [
    ButtonComponent,
    SelectComponent,
    DashboardComponent,
    ProfileImageComponent,
    ContentContainerComponent,
    SearchComponent,
    HeaderComponent,
    EmployeePageComponent,
    EmployeeInfoComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, ReactiveFormsModule],
  exports: [
    ButtonComponent,
    SelectComponent,
    DashboardComponent,
    ProfileImageComponent,
    SearchComponent,
    HeaderComponent,
    MaterialModule,
  ],
})
export class SharedModule {}
