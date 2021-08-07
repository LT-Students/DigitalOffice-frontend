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
import { ProjectComponent } from './components/project/project.component';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { TaskFilterPipe } from './pipes/task-filter.pipe';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
	declarations: [
		DateDescComponent,
		AttendanceComponent,
		DoughnutChartComponent,
		AddHoursComponent,
		GradientGraphicsComponent,
		UserTasksComponent,
		ProjectComponent,
		ProjectsTableComponent,
		ProjectPageComponent,
		TaskFilterPipe,
	],
	imports: [SharedModule, NgbDatepickerModule, AdminModule, UserRoutingModule, FormsModule],
	providers: [],
	exports: [AttendanceComponent],
})
export class UserModule {}
