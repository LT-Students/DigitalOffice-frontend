import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { DndDirective } from '@app/directives/dnd.directive';

import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { UserSearchComponent } from './components/new-project/modals/user-search/user-search.component';
import { TeamCardComponent } from './components/team-cards/team-card.component';
import { NewCompanyComponent } from './components/new-company/new-company.component';
import { UploadComponent } from './components/upload/upload.component';
import { ProgressComponent } from './components/upload/progress/progress.component';
import { NewDepartmentComponent } from './components/new-department/new-department.component';
import { NewSpecializationComponent } from './components/new-specialization/new-specialization.component';
import { DeleteDirectionComponent } from './components/new-project/modals/delete-direction/delete-direction.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NewRoleComponent } from './components/new-role/new-role.component';

@NgModule({
	declarations: [
		DashboardComponent,
		AdminComponent,
		ProjectCardComponent,
		NewEmployeeComponent,
		NewProjectComponent,
		UserSearchComponent,
		NewCompanyComponent,
		TeamCardComponent,
		UploadComponent,
		DndDirective,
		ProgressComponent,
		NewDepartmentComponent,
		NewSpecializationComponent,
		DeleteDirectionComponent,
		NewRoleComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		SharedModule,
		AdminRoutingModule
	],
	exports: [
		ProjectCardComponent,
		DndDirective
	],
})
export class AdminModule {}
