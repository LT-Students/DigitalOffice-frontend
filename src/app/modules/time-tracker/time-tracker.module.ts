import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { TimeWidgetComponent } from './components/time-widget/time-widget.component';
import { AddHoursComponent } from './components/add-hours/add-hours.component';
import { UserTasksComponent } from './components/user-tasks/user-tasks.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { TimeTrackerRoutingModule } from './time-tracker-routing.module';
import { EditProjectComponent } from './modals/edit-project/edit-project.component';
import { EditLeaveComponent } from './modals/edit-leave/edit-leave.component';
import { DoughnutChartComponent } from './components/time-widget/doughnut-chart/doughnut-chart.component';
import { AddLeaveHoursComponent } from './components/add-hours/add-leave-hours/add-leave-hours.component';
import { AddWorktimeHoursComponent } from './components/add-hours/add-worktime-hours/add-worktime-hours.component';
import { LegendComponent } from './components/time-widget/legend/legend.component';

@NgModule({
	declarations: [
		AttendanceComponent,
		TimeWidgetComponent,
		AddHoursComponent,
		UserTasksComponent,
		ProjectsComponent,
		LeavesComponent,
		EditProjectComponent,
		EditLeaveComponent,
		DoughnutChartComponent,
		AddLeaveHoursComponent,
		AddWorktimeHoursComponent,
		LegendComponent,
	],
	imports: [SharedModule, TimeTrackerRoutingModule],
	providers: [],
	exports: [],
})
export class TimeTrackerModule {}
