import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material.module';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { MyProjectComponent } from './components/my-project/my-project.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { MembersBoardComponent } from './components/members-board/members-board.component';
import { TeamCardComponent } from './components/team-cards/team-card.component';
import { NewCompanyComponent } from './components/new-company/new-company.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    MyProjectComponent,
    NewEmployeeComponent,
    NewProjectComponent,
    MembersBoardComponent,
    NewCompanyComponent,
    TeamCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SharedModule,
  ],
  entryComponents: [NewCompanyComponent],
})
export class AdminModule {}
