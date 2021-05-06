import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { DndDirective } from '@app/directives/dnd.directive';

import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { NewMembersBoardComponent } from './components/new-project/modals/new-members-board/new-members-board.component';
import { TeamCardComponent } from './components/team-cards/team-card.component';
import { NewCompanyComponent } from './components/new-company/new-company.component';
import { NewMemberComponent } from './components/new-project/modals/new-member/new-member.component';
import { UploadComponent } from './components/upload/upload.component';
import { ProgressComponent } from './components/upload/progress/progress.component';
import { NewDepartmentComponent } from './components/new-department/new-department.component';
import { NewSpecializationComponent } from './components/new-specialization/new-specialization.component';
import { CreateDirectionComponent } from './components/new-project/modals/create-direction/create-direction.component';
import { DeleteDirectionComponent } from './components/new-project/modals/delete-direction/delete-direction.component';

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
    NewDepartmentComponent,
    NewSpecializationComponent,
    CreateDirectionComponent,
    DeleteDirectionComponent,
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
