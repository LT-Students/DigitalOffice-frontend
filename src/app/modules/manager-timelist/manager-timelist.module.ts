import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SharedTimeTrackingSystemModule } from '@shared/modules/shared-time-tracking-system/shared-time-tracking-system.module';
import { TableModule } from '../table/table.module';
import { DynamicFilterModule } from '../dynamic-filter/dynamic-filter.module';
import { ManagerTimelistComponent } from './manager-timelist.component';
import { ManagerTimelistRoutingModule } from './manager-timelist-routing.module';
import { AddLeaveTimeDialogComponent } from './add-leave-time-dialog/add-leave-time-dialog.component';

@NgModule({
	declarations: [ManagerTimelistComponent, AddLeaveTimeDialogComponent],
	imports: [
		ManagerTimelistRoutingModule,
		SharedModule,
		TableModule,
		DynamicFilterModule,
		SharedTimeTrackingSystemModule,
	],
	exports: [ManagerTimelistComponent],
})
export class ManagerTimelistModule {}
