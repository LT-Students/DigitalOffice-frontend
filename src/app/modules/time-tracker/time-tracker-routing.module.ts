import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AttendanceService } from './services/attendance.service';
import { AttendanceComponent } from './components/attendance/attendance.component';

const timeTrackerRoutes: Routes = [
	{
		path: '',
		component: AttendanceComponent,
		resolve: {
			attendance: AttendanceService,
		},
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(timeTrackerRoutes)],
	exports: [RouterModule],
})
export class TimeTrackerRoutingModule {}
