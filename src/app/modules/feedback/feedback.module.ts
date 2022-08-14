import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DynamicFilterModule } from '../dynamic-filter/dynamic-filter.module';
import { TableModule } from '../table/table.module';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { UploadImagesComponent } from './feedback-form/upload-images/upload-images.component';
import { ImageComponent } from './feedback-image/image.component';
import { ReportListComponent } from './report-list/report-list.component';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { ReportDetailsComponent } from './report-details/report-details.component';

@NgModule({
	declarations: [
		FeedbackFormComponent,
		UploadImagesComponent,
		ImageComponent,
		ReportListComponent,
		ReportDetailsComponent,
	],
	imports: [SharedModule, TableModule, DynamicFilterModule, FeedbackRoutingModule],
	exports: [FeedbackFormComponent, ReportListComponent],
})
export class FeedbackModule {}
