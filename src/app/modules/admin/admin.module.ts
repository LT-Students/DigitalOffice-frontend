import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { MyProjectComponent } from './components/my-project/my-project.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { AddingACompanyComponent } from './components/adding-a-company/adding-a-company.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    MyProjectComponent,
    NewEmployeeComponent,
    AddingACompanyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
