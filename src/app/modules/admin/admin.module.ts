import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { MyProjectComponent } from './components/my-project/my-project.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';

// import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    MyProjectComponent,
    NewEmployeeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // AdminRoutingModule
  ]
})
export class AdminModule {
}
