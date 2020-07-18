import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ChooseDateComponent } from './choose-date/choose-date.component';

import { ChooseIntComponent } from './choose-int/choose-int.component';
import { LogInComponent } from './log-in/log-in.component';
import { ProjectStatsComponent } from './project-stats/project-stats.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { AddMemberOnComponent } from './add-member-on/add-member-on.component';
import { AddMemberOffComponent } from './add-member-off/add-member-off.component';

import { ProjectInfoMyStatComponent } from './project-info-my-stat/project-info-my-stat.component';
import { ProjectInfoTeamComponent } from './project-info-team/project-info-team.component';
import { ProjectInfoFeedComponent } from './project-info-feed/project-info-feed.component';
import { SaveDraftComponent } from './save-draft/save-draft.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { AddFileComponent } from './add-file/add-file.component';
import { SendPostComponent } from './send-post/send-post.component';
import { AddIconsPaperComponent } from './add-icons-paper/add-icons-paper.component';
import { AddIconsChainComponent } from './add-icons-chain/add-icons-chain.component';
import { RespondIconsSmileyComponent } from './respond-icons-smiley/respond-icons-smiley.component';
import { RespondIconsCamComponent } from './respond-icons-cam/respond-icons-cam.component';
import { RespondIconsAirplaneComponent } from './respond-icons-airplane/respond-icons-airplane.component';
import { SortListComponent } from './sort-list/sort-list.component';
import { SortCardsComponent } from './sort-cards/sort-cards.component';
import { SortListOffComponent } from './sort-list-off/sort-list-off.component';
import { SortCardsOffComponent } from './sort-cards-off/sort-cards-off.component';
import { SortProjectComponent } from './sort-project/sort-project.component';
import { SortProjectOffComponent } from './sort-project-off/sort-project-off.component';
import { SortTagComponent } from './sort-tag/sort-tag.component';
import { SortTagOffComponent } from './sort-tag-off/sort-tag-off.component';
import { ProjectInfoMyStatOffComponent } from './project-info-my-stat-off/project-info-my-stat-off.component';
import { ProjectInfoTeamOffComponent } from './project-info-team-off/project-info-team-off.component';
import { ProjectInfoFeedOffComponent } from './project-info-feed-off/project-info-feed-off.component';


@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    ChooseDateComponent,
    ChooseIntComponent,
    LogInComponent,
    ProjectStatsComponent,
    ProjectEditComponent,
    AddButtonComponent,
    AddMemberOnComponent,
    AddMemberOffComponent,

    ProjectInfoMyStatComponent,
    ProjectInfoTeamComponent,
    ProjectInfoFeedComponent,
    SaveDraftComponent,
    CreateProjectComponent,
    AddFileComponent,
    SendPostComponent,
    AddIconsPaperComponent,
    AddIconsChainComponent,
    RespondIconsSmileyComponent,
    RespondIconsCamComponent,
    RespondIconsAirplaneComponent,
    SortListComponent,
    SortCardsComponent,
    SortListOffComponent,
    SortCardsOffComponent,
    SortProjectComponent,
    SortProjectOffComponent,
    SortTagComponent,
    SortTagOffComponent,
    ProjectInfoMyStatOffComponent,
    ProjectInfoTeamOffComponent,
    ProjectInfoFeedOffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
