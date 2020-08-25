import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from './attendance.component';
import {AttendancePageComponent} from './attendance-page/attendance-page.component';


const authRoutes: Routes = [
    {
        path: 'attendance',
        component: AttendanceComponent,
        children: [
            { path: 'page', component: AttendancePageComponent },
        ],
    }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
  providers: []
})
export class AttendanceRoutingModule { }
