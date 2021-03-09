import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { NewMembersBoardComponent } from './components/new-members-board/new-members-board.component';
import { TeamCardComponent } from './components/team-cards/team-card.component';
import { NewCompanyComponent } from './components/new-company/new-company.component';
import { NewMemberComponent } from './components/new-member/new-member.component';
import { UploadComponent } from './components/upload/upload.component';
import { DndDirective } from '../../core/directives/dnd.directive';
import { ProgressComponent } from './components/upload/progress/progress.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    ProjectCardComponent,
    NewEmployeeComponent,
    NewProjectComponent,
    NewMembersBoardComponent,
    NewCompanyComponent,
    TeamCardComponent,
    NewMemberComponent,
    UploadComponent,
    DndDirective,
    ProgressComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
  exports: [ProjectCardComponent],
})
export class AdminModule {}
