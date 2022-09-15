import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ManagerTimelistModule } from '../manager-timelist/manager-timelist.module';
import { TableModule } from '../table/table.module';
import { DynamicFilterModule } from '../dynamic-filter/dynamic-filter.module';
import { AddUsersDialogModule } from '../add-users-dialog/add-users-dialog.module';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentPageComponent } from './department-page/department-page.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentIdRouteContainerComponent } from './department-id-route-container/department-id-route-container.component';
import { DepartmentInfoComponent } from './department-page/department-info/department-info.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { DepartmentUsersComponent } from './department-page/department-users/department-users.component';
import { DepartmentProjectsComponent } from './department-page/department-projects/department-projects.component';
import { TransferProjectsDialogComponent } from './department-page/department-projects/transfer-projects-dialog/transfer-projects-dialog.component';
import { TransferFilterComponent } from './department-page/department-projects/transfer-projects-dialog/transfer-filter/transfer-filter.component';
import { DepartmentOverviewComponent } from './department-page/department-overview/department-overview.component';

@NgModule({
	declarations: [
		DepartmentPageComponent,
		DepartmentListComponent,
		DepartmentIdRouteContainerComponent,
		DepartmentInfoComponent,
		CreateDepartmentComponent,
		EditDepartmentComponent,
		DepartmentUsersComponent,
		DepartmentProjectsComponent,
		TransferProjectsDialogComponent,
		TransferFilterComponent,
		DepartmentOverviewComponent,
	],
	imports: [
		SharedModule,
		DepartmentsRoutingModule,
		ManagerTimelistModule,
		DynamicFilterModule,
		TableModule,
		AddUsersDialogModule,
	],
})
export class DepartmentsModule {}
