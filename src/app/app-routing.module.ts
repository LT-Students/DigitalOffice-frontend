import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { DateDescComponent } from './date-desc/date-desc.component';
import { AttendanceComponent } from './attendance/attendance.component';
import {ChartComponent} from "./chart/chart.component";
import {LoginComponent} from "./auth/login/login.component";


const routes: Routes = [

  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'attendance', component: AttendanceComponent, children: [
      { path: '', component: AttendanceComponent },
      { path: 'trrak', redirectTo: '/attendance', pathMatch: 'full'}
    ] },
  /*{ path: 'admin', component: AdminComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'trrak', redirectTo: '/attendance', pathMatch: 'full' }
      { path: 'addEmployee', component: AddEmployee },
      { path: 'addCompany', component: AddCompany },
    ]},*/


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
