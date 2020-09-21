import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Materials
import { MatCardModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import {SharedModule} from '../shared/shared.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { MyProjectComponent } from './components/my-project/my-project.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { TeamCardsComponent } from './components/team-cards/team-cards.component';
import { TeamCardComponent } from './components/team-card/team-card.component';

@NgModule({
    declarations: [
        DashboardComponent,
        AdminComponent,
        MyProjectComponent,
        NewEmployeeComponent,
        NewProjectComponent,
        TeamCardComponent,
        TeamCardsComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    SharedModule
  ]
})
export class AdminModule {
}
