import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ManagerTimelistModule } from '../manager-timelist/manager-timelist.module';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentCardComponent } from './components/department-card/department-card.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DirectorsTimelistComponent } from './components/directors-timelist/directors-timelist.component';
import { DepartmentIdRouteContainerComponent } from './components/department-id-route-container/department-id-route-container.component';

@NgModule({
	declarations: [
		DepartmentCardComponent,
		DepartmentListComponent,
		DirectorsTimelistComponent,
		DepartmentIdRouteContainerComponent,
	],
	imports: [SharedModule, DepartmentsRoutingModule, ManagerTimelistModule],
})
export class DepartmentsModule {}
