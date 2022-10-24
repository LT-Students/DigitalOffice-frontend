import { NgModule } from '@angular/core';
import { AddLeaveTimeBaseComponent } from '@shared/modules/shared-time-tracking-system/add-leave-time-base/add-leave-time-base.component';
import { WorkTimeChangedTooltipComponent } from '@shared/modules/shared-time-tracking-system/work-time-changed-tooltip/work-time-changed-tooltip.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	declarations: [AddLeaveTimeBaseComponent, WorkTimeChangedTooltipComponent],
	imports: [SharedModule],
	exports: [AddLeaveTimeBaseComponent, WorkTimeChangedTooltipComponent],
})
export class SharedTimeTrackingSystemModule {}
