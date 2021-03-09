import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

import { ButtonComponent } from './component/button/button.component';
import { SelectComponent } from './component/select/select.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProfileImageComponent } from './component/profile-image/profile-image.component';
import { ContentContainerComponent } from './component/content-container/content-container.component';
import { SearchComponent } from './component/search/search.component';
import { HeaderComponent } from './component/header/header.component';

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
  imports: [CommonModule, RouterModule, MaterialModule],
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
