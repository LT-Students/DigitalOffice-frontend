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

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    TagsBlockComponent,
    SelectComponent,
    DateDescComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AdminModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
