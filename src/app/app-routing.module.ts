import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolbarContainerComponent } from './modules/shared/toolbar-container/toolbar-container.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AdminComponent } from './modules/admin/components/admin/admin.component';
import { DashboardComponent } from './modules/admin/components/dashboard/dashboard.component';
import { NewEmployeeComponent } from './modules/admin/components/new-employee/new-employee.component';
import { NewProjectComponent } from './modules/admin/components/new-project/new-project.component';
import { AttendanceComponent } from './modules/user/components/attendance/attendance.component';


const routes: Routes = [
  {
    path: '', component: ToolbarContainerComponent, children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user/attendance'
      },
      {
        path: 'user/attendance',
        component: AttendanceComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'dashboard'
          },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'new-employee', component: NewEmployeeComponent },
          { path: 'new-project', component: NewProjectComponent }
        ],
        // canActivate: [AdminGuard, AuthGuard]
      }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
