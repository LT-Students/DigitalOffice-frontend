//@ts-nocheck
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { DndDirective } from '@app/directives/dnd.directive';

import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { NewEmployeeComponent } from './modals/new-employee/new-employee.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { UserSearchComponent } from './components/new-project/modals/user-search/user-search.component';
import { TeamCardComponent } from './components/team-cards/team-card.component';
import { NewCompanyComponent } from './modals/new-company/new-company.component';
import { UploadComponent } from './components/upload/upload.component';
import { ProgressComponent } from './components/upload/progress/progress.component';
import { NewDepartmentComponent } from './modals/new-department/new-department.component';
import { NewPositionComponent } from './modals/new-position/new-position.component';
import { DeleteDirectionComponent } from './components/new-project/modals/delete-direction/delete-direction.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NewRoleComponent } from './modals/new-role/new-role.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { NewOfficeComponent } from './modals/new-office/new-office.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentCardComponent } from './components/department-card/department-card.component';
import { ManageRolesComponent } from './components/manage-roles/manage-roles.component';
import { OfficeListComponent } from './components/office-list/office-list.component';
import { PositionListComponent } from './components/position-list/position-list.component';
import { DirectorsTimelistComponent } from './components/directors-timelist/directors-timelist.component';
import { TeamStatisticsComponent } from './components/team-statistics/team-statistics.component'
import { LeaveLabelPipe } from './pipes/leave-label.pipe';

@NgModule({
	declarations: [
		DashboardComponent,
		AdminComponent,
		NewEmployeeComponent,
		NewProjectComponent,
		UserSearchComponent,
		NewCompanyComponent,
		TeamCardComponent,
		UploadComponent,
		ProgressComponent,
		NewDepartmentComponent,
		NewPositionComponent,
		DeleteDirectionComponent,
		NewRoleComponent,
		ManageUsersComponent,
		NewOfficeComponent,
		DepartmentListComponent,
		DepartmentCardComponent,
		ManageRolesComponent,
		OfficeListComponent,
		PositionListComponent,
		DirectorsTimelistComponent,
		TeamStatisticsComponent,
		LeaveLabelPipe
	],
	imports: [FormsModule, ReactiveFormsModule, MaterialModule, SharedModule, AdminRoutingModule],
	exports: [DndDirective, TeamStatisticsComponent],
})
export class AdminModule { }
