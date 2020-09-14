/*
todo we will add separate routing module later
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { NewProjectComponent} from './components/new-project/new-project.component';


const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'new-employee', component: NewEmployeeComponent },
            { path: 'new-project', component: NewProjectComponent}
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
*/
