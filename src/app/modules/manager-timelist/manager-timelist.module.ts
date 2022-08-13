import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '../table/table.module';
import { DynamicFilterModule } from '../dynamic-filter/dynamic-filter.module';
import { ManagerTimelistComponent } from './manager-timelist.component';
import { ManagerTimelistRoutingModule } from './manager-timelist-routing.module';

@NgModule({
	declarations: [ManagerTimelistComponent],
	imports: [ManagerTimelistRoutingModule, SharedModule, TableModule, DynamicFilterModule],
	exports: [ManagerTimelistComponent],
})
export class ManagerTimelistModule {}
