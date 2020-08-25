import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from './attendance.component';


const authRoutes: Routes = [
    {
        path: 'attendance',
        component: AttendanceComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
  providers: []
})
export class AttendanceRoutingModule { }
