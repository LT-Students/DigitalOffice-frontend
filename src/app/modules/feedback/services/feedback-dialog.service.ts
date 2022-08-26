import { Injectable } from '@angular/core';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { FeedbackInfo } from '@api/feedback-service/models/feedback-info';
import { ImageContent } from '@api/feedback-service/models/image-content';
import { MatDialogRef } from '@angular/material/dialog';
import { FeedbackFormComponent } from '../feedback-form/feedback-form.component';
import { FeedbackDetailsComponent } from '../feedback-details/feedback-details.component';

@Injectable({
	providedIn: 'root',
})
export class FeedbackDialogService {
	constructor(private dialog: DialogService) {}

	public openFeedbackForm(): void {
		this.dialog.open(FeedbackFormComponent, {
			width: ModalWidth.M,
			disableClose: true,
		});
	}

	public openReportDetails(feedback: FeedbackInfo, images?: ImageContent[]): MatDialogRef<FeedbackDetailsComponent> {
		return this.dialog.open(FeedbackDetailsComponent, { width: ModalWidth.M, data: { feedback, images } });
	}
}
