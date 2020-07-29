import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DoSelectComponent} from './do-select/do-select.component';
// import {ProjectService, TitleService} from './options.service.';

@NgModule({
  declarations: [
    AppComponent,
    DoSelectComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
