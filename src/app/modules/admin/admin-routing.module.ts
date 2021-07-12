import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteType } from '../../app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManageRolesComponent } from './components/manage-roles/manage-roles.component';


const adminRoutes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'new-project', component: NewProjectComponent },
	{ path: 'manage-users', component: ManageUsersComponent },
	{ path: 'manage-roles', component: ManageRolesComponent },
	{ path: '**', redirectTo: RouteType.ADMIN, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
