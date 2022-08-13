import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { UploadImagesComponent } from './feedback-form/upload-images/upload-images.component';
import { ImageComponent } from './feedback-form/upload-images/image.component';

@NgModule({
	declarations: [FeedbackFormComponent, UploadImagesComponent, ImageComponent],
	imports: [SharedModule],
	exports: [FeedbackFormComponent],
})
export class FeedbackModule {}
