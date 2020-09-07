import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolbarContainerComponent } from './modules/shared/toolbar-container/toolbar-container.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AttendanceComponent } from './modules/employee/components/attendance/attendance.component';
import { AdminComponent } from './modules/admin/components/admin/admin.component';
import { DashboardComponent } from './modules/admin/components/dashboard/dashboard.component';
import { NewEmployeeComponent } from './modules/admin/components/new-employee/new-employee.component';


const routes: Routes = [
  {
    path: '', component: ToolbarContainerComponent, children: [
      {
        path: 'user/attendance',
        component: AttendanceComponent,
        // canLoad: [AuthGuard],
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          {path: 'dashboard', component: DashboardComponent},
          {path: 'new-employee', component: NewEmployeeComponent}
        ],
        // canLoad: [AdminGuard],
        // canActivate: [AdminGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
