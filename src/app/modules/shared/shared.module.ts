import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from '../../app-material.module';

import { ButtonComponent } from './button/button.component';
import { SelectComponent } from './select/select.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { ContentContainerComponent } from './content-container/content-container.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    ButtonComponent,
    SelectComponent,
    DashboardComponent,
    ProfileImageComponent,
    ContentContainerComponent,
    SearchComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, RouterModule, AppMaterialModule],
  exports: [
    ButtonComponent,
    SelectComponent,
    DashboardComponent,
    ProfileImageComponent,
    SearchComponent,
    HeaderComponent,
  ],
})
export class SharedModule {}
