import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ManagerTimelistModule } from '../manager-timelist/manager-timelist.module';
import { TableModule } from '../table/table.module';
import { DynamicFilterModule } from '../dynamic-filter/dynamic-filter.module';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentPageComponent } from './department-page/department-page.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentIdRouteContainerComponent } from './department-id-route-container/department-id-route-container.component';
import { DepartmentInfoComponent } from './department-page/department-info/department-info.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';

@NgModule({
	declarations: [
		DepartmentPageComponent,
		DepartmentListComponent,
		DepartmentIdRouteContainerComponent,
		DepartmentInfoComponent,
		CreateDepartmentComponent,
	],
	imports: [SharedModule, DepartmentsRoutingModule, ManagerTimelistModule, DynamicFilterModule, TableModule],
})
export class DepartmentsModule {}
