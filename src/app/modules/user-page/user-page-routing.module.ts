import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { UserPageComponent } from './user-page.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserPageComponent,
    children: [
      { path: 'attendance', component: AttendanceComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPageRoutingModule { }
