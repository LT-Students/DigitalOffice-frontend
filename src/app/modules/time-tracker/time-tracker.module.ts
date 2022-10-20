import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { TimeWidgetComponent } from './components/time-widget/time-widget.component';
import { AddHoursComponent } from './components/add-hours/add-hours.component';
import { UserTasksComponent } from './components/user-tasks/user-tasks.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { TimeTrackerRoutingModule } from './time-tracker-routing.module';
import { EditProjectComponent } from './dialogs/edit-project/edit-project.component';
import { EditLeaveComponent } from './dialogs/edit-leave/edit-leave.component';
import { DoughnutChartComponent } from './components/time-widget/doughnut-chart/doughnut-chart.component';
import { AddLeaveHoursComponent } from './components/add-hours/add-leave-hours/add-leave-hours.component';
import { AddWorkTimeHoursComponent } from './components/add-hours/add-worktime-hours/add-work-time-hours.component';
import { LegendComponent } from './components/time-widget/legend/legend.component';
import { LeaveHoursPipe } from './components/leaves/leave-hours.pipe';
import { AddLeaveTimeBaseComponent } from './shared/add-leave-time-base/add-leave-time-base.component';
import { WorkTimeChangedTooltipComponent } from './shared/work-time-changed-tooltip/work-time-changed-tooltip.component';

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
		AddWorkTimeHoursComponent,
		LegendComponent,
		LeaveHoursPipe,
		AddLeaveTimeBaseComponent,
		WorkTimeChangedTooltipComponent,
	],
	imports: [SharedModule, TimeTrackerRoutingModule],
	providers: [],
	exports: [AddLeaveTimeBaseComponent, WorkTimeChangedTooltipComponent],
})
export class TimeTrackerModule {}
