import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { MyProjectComponent } from './components/my-project/my-project.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { NewCompanyComponent } from "./components/new-company/new-company.component";
import { MatDialogModule} from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    MyProjectComponent,
    NewEmployeeComponent,
    NewCompanyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
  ],
  entryComponents: [
    NewCompanyComponent,
  ]

})
export class AdminModule { }
