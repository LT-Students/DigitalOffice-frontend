import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DynamicFilterModule } from '../dynamic-filter/dynamic-filter.module';
import { TableModule } from '../table/table.module';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { UploadImagesComponent } from './feedback-form/upload-images/upload-images.component';
import { ImageComponent } from './feedback-image/image.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackDetailsComponent } from './feedback-details/feedback-details.component';
import { FeedbackCategoryPipe } from './feedback-category.pipe';

@NgModule({
	declarations: [
		FeedbackFormComponent,
		UploadImagesComponent,
		ImageComponent,
		FeedbackListComponent,
		FeedbackDetailsComponent,
		FeedbackCategoryPipe,
	],
	imports: [SharedModule, TableModule, DynamicFilterModule, FeedbackRoutingModule],
	exports: [FeedbackFormComponent, FeedbackListComponent],
})
export class FeedbackModule {}
