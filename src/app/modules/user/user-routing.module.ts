import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AttendanceComponent } from './components/attendance/attendance.component';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { RouteType } from '../../app-routing.module';

const userRoutes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'attendance' },
	{ path: 'attendance', component: AttendanceComponent },
	{ path: 'projects-table', component: ProjectsTableComponent },
	{ path: '**', redirectTo: RouteType.USER, pathMatch: 'full' },
];

@NgModule({
	imports: [ RouterModule.forChild(userRoutes) ],
	exports: [ RouterModule ],
})
export class UserRoutingModule {
}
