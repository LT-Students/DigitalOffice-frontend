import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';


const adminRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { 
        path: '', 
        component: AdminComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }