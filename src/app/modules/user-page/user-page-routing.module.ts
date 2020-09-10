import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { UserPageComponent } from './user-page.component';
import { AdminGuard } from '../../guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: UserPageComponent,
    children: [
      { path: 'attendance', component: AttendanceComponent },
      { path: 'admin' , loadChildren: '../admin/admin.module#AdminModule'}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPageRoutingModule { }
