import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DoSelectComponent } from './do-select/do-select.component';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DoDateDescComponent } from './do-datedesc/do-datedesc.component';

@NgModule({
  declarations: [
    AppComponent,
    DoSelectComponent,
    DoDatedescComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
