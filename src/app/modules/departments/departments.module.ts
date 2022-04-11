import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentCardComponent } from './components/department-card/department-card.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DirectorsTimelistComponent } from './components/directors-timelist/directors-timelist.component';

@NgModule({
	declarations: [DepartmentCardComponent, DepartmentListComponent, DirectorsTimelistComponent],
	imports: [SharedModule, DepartmentsRoutingModule],
})
export class DepartmentsModule {}
