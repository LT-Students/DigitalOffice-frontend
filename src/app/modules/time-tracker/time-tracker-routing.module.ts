import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AttendanceComponent } from './components/attendance/attendance.component';
import { AttendanceResolver } from './attendance.resolver';

const timeTrackerRoutes: Routes = [
	{
		path: '',
		component: AttendanceComponent,
		resolve: {
			attendance: AttendanceResolver,
		},
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(timeTrackerRoutes)],
	exports: [RouterModule],
})
export class TimeTrackerRoutingModule {}
