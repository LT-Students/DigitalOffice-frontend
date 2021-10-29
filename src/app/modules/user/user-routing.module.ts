import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AttendanceService } from '@app/services/attendance.service';
import { RouteType } from '../../app-routing.module';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { ProjectListResolver } from './resolvers/project-list.resolver';

const userRoutes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'attendance' },
	{
		path: 'attendance',
		component: AttendanceComponent,
		resolve: {
			attendance: AttendanceService,
		},
	},
	{
		path: 'projects-table',
		component: ProjectsTableComponent,
		resolve: {
			projects: ProjectListResolver,
		},
	},
	{ path: '**', redirectTo: RouteType.USER, pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(userRoutes)],
	exports: [RouterModule],
})
export class UserRoutingModule {}
