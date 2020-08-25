import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateDescComponent } from './date-desc/date-desc.component';
import { AttendanceComponent } from './attendance/attendance.component';


const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'attendance', component: AttendanceComponent },
  { path: "admin" , loadChildren: './admin/admin.module#AdminModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
