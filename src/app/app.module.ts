import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DoSelectComponent } from './do-select/do-select.component';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DoDatedescComponent } from './do-datedesc/do-datedesc.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { IconsComponent } from './icons/icons.component';
import { TagsBlockComponent } from './tags-block/tags-block.component';
import { AdminModule } from './admin/admin.module';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

<<<<<<< HEAD
registerLocaleData(localeRu);

=======
>>>>>>> origin/develop
@NgModule({
  declarations: [
    AppComponent,
    ButtonsComponent,
    IconsComponent,
    TagsBlockComponent,
    DoSelectComponent,
    DoDatedescComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
<<<<<<< HEAD
    RouterModule,
    AppRoutingModule,
    AdminModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
=======
    AppRoutingModule,
    AuthModule,
    RouterModule
>>>>>>> origin/develop
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
