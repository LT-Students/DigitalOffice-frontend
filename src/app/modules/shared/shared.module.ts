import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './button/button.component';
import { SelectComponent } from './select/select.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarContainerComponent } from './toolbar-container/toolbar-container.component';
import { SearchComponent } from './search/search.component';
import { AppMaterialModule } from 'src/app/app-material.module';



@NgModule({
  declarations: [
    ButtonComponent,
    SelectComponent,
    ToolbarComponent,
    ToolbarContainerComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule
  ],
  exports: [
    ButtonComponent,
    SelectComponent,
    ToolbarComponent,
    SearchComponent
  ]
})
export class SharedModule { }
