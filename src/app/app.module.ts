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
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { AuthGuard } from './services/auth.guard';


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
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    RouterModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {provide: LOCALE_ID, useValue: 'ru-RU'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
