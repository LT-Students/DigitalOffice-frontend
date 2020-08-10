import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { IconsComponent } from './icons/icons.component';
import { TagsBlockComponent } from './tags-block/tags-block.component';
import { UserTasksComponent } from './user-tasks/user-tasks.component';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtonsComponent,
    IconsComponent,
    TagsBlockComponent,
    UserTasksComponent,
    TaskComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
