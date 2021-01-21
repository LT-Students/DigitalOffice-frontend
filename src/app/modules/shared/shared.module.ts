import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './button/button.component';
import { SelectComponent } from './select/select.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { ToolbarContainerComponent } from './toolbar-container/toolbar-container.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    ButtonComponent,
    SelectComponent,
    ToolbarComponent,
    ProfileImageComponent,
    ToolbarContainerComponent,
    SearchComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ButtonComponent,
    SelectComponent,
    ToolbarComponent,
    ProfileImageComponent,
    SearchComponent,
    HeaderComponent,
  ],
})
export class SharedModule {}
