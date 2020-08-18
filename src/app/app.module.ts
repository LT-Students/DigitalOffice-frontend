import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DoSelectComponent } from './do-select/do-select.component';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DoDatedescComponent } from './do-datedesc/do-datedesc.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { IconsComponent } from './icons/icons.component';
import { TagsBlockComponent } from './tags-block/tags-block.component';
import { LOCALE_ID} from '@angular/core';
import { registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);


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
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
