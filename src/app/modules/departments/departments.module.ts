import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ManagerTimelistModule } from '../manager-timelist/manager-timelist.module';
import { TableModule } from '../table/table.module';
import { DynamicFilterModule } from '../dynamic-filter/dynamic-filter.module';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentCardComponent } from './components/department-card/department-card.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentIdRouteContainerComponent } from './components/department-id-route-container/department-id-route-container.component';

@NgModule({
	declarations: [DepartmentCardComponent, DepartmentListComponent, DepartmentIdRouteContainerComponent],
	imports: [SharedModule, DepartmentsRoutingModule, ManagerTimelistModule, DynamicFilterModule, TableModule],
})
export class DepartmentsModule {}
