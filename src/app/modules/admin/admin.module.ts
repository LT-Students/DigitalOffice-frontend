import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewEmployeeComponent } from './modals/new-employee/new-employee.component';
import { TeamCardComponent } from './components/team-cards/team-card.component';
import { UploadComponent } from './components/upload/upload.component';
import { ProgressComponent } from './components/upload/progress/progress.component';
import { AddEditDepartmentComponent } from './modals/add-edit-department/add-edit-department.component';
import { AddEditPositionComponent } from './modals/add-edit-position/add-edit-position.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AddEditRoleComponent } from './modals/add-edit-role/add-edit-role.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AddEditOfficeComponent } from './modals/add-edit-office/add-edit-office.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentCardComponent } from './components/department-card/department-card.component';
import { ManageRolesComponent } from './components/manage-roles/manage-roles.component';
import { OfficeListComponent } from './components/office-list/office-list.component';
import { PositionListComponent } from './components/position-list/position-list.component';
import { DirectorsTimelistComponent } from './components/directors-timelist/directors-timelist.component';
import { EditCompanyComponent } from './modals/edit-company/edit-company.component';

@NgModule({
	declarations: [
		DashboardComponent,
		NewEmployeeComponent,
		TeamCardComponent,
		UploadComponent,
		ProgressComponent,
		AddEditDepartmentComponent,
		AddEditPositionComponent,
		AddEditRoleComponent,
		ManageUsersComponent,
		AddEditOfficeComponent,
		DepartmentListComponent,
		DepartmentCardComponent,
		ManageRolesComponent,
		OfficeListComponent,
		PositionListComponent,
		DirectorsTimelistComponent,
		EditCompanyComponent,
	],
	imports: [SharedModule, AdminRoutingModule],
	exports: [],
})
export class AdminModule {}
