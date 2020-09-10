import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { MyProjectComponent } from './components/my-project/my-project.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    MyProjectComponent,
    NewEmployeeComponent,
    AddMemberComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule { }
