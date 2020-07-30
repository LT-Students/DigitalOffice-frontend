import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonsComponent } from './buttons/buttons.component';
import { IconsComponent } from './icons/icons.component';
import { TagsBlockComponent } from './tags-block/tags-block.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtonsComponent,
    IconsComponent,
    TagsBlockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
