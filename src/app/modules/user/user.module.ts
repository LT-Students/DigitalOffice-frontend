//@ts-nocheck
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../shared/material.module';
import { AdminModule } from '../admin/admin.module';
import { SharedModule } from '../../shared/shared.module';
import { DateDescComponent } from './components/date-desc/date-desc.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { DoughnutChartComponent } from './components/chart/doughnut-chart.component';
import { AddHoursComponent } from './components/add-hours/add-hours.component';
import { GradientGraphicsComponent } from './components/gradient-graphics/gradient-graphics.component';
import { UserTasksComponent } from './components/user-tasks/user-tasks.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { TaskFilterPipe } from './pipes/task-filter.pipe';
import { UserRoutingModule } from './user-routing.module';
import { DeleteLeaveComponent } from './modals/delete-leave/delete-leave.component';
import { EditProjectComponent } from './modals/edit-project/edit-project.component';
import { EditLeaveComponent } from './modals/edit-leave/edit-leave.component';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
	declarations: [
		DateDescComponent,
		AttendanceComponent,
		DoughnutChartComponent,
		AddHoursComponent,
		GradientGraphicsComponent,
		UserTasksComponent,
		ProjectsComponent,
		ProjectsTableComponent,
		ProjectPageComponent,
		DeleteLeaveComponent,
		TaskFilterPipe,
		LeavesComponent,
		EditProjectComponent,
		EditLeaveComponent,
		CommentComponent
	],
	imports: [
		SharedModule,
		NgbDatepickerModule,
		AdminModule,
		UserRoutingModule,
	],
	providers: [],
	exports: [
		AttendanceComponent,
	],
})
export class UserModule { }
