import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material.module';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { MyProjectComponent } from './components/my-project/my-project.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { NewMembersBoardComponent } from './components/new-members-board/new-members-board.component';
import { TeamCardComponent } from './components/team-cards/team-card.component';
import { NewCompanyComponent } from './components/new-company/new-company.component';
import { NewMemberComponent } from './components/new-member/new-member.component';
import { UploadComponent } from './components/upload/upload.component';
import { DndDirective } from './components/upload/dnd.directive';
import { ProgressComponent } from './components/upload/progress/progress.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    MyProjectComponent,
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
    AppMaterialModule,
    SharedModule,
  ],
})
export class AdminModule {}
