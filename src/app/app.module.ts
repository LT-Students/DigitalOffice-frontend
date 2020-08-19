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
import { AppRoutingModule } from './app-routing.module';
import { UserTasksComponent } from './user-tasks/user-tasks.component';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    TagsBlockComponent,
    SelectComponent,
    DateDescComponent,
    ToolbarComponent,
    UserTasksComponent,
    TaskComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
