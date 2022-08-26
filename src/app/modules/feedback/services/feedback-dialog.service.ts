import { Injectable } from '@angular/core';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { FeedbackInfo } from '@api/feedback-service/models/feedback-info';
import { ImageContent } from '@api/feedback-service/models/image-content';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppRoutes } from '@app/models/app-routes';
import { Subject } from 'rxjs';
import { FeedbackDetailsComponent } from '../feedback-details/feedback-details.component';
import { FeedbackFormComponent } from '../feedback-form/feedback-form.component';

@Injectable({
	providedIn: 'root',
})
export class FeedbackDialogService {
	// this subject is only needed for Feedback list page to refresh data after new feedback was created.
	private refreshFeedbackPage = new Subject();
	public refreshFeedbackPage$ = this.refreshFeedbackPage.asObservable();

	constructor(private dialog: DialogService, private router: Router) {}

	public openFeedbackForm(): void {
		this.dialog
			.open<boolean>(FeedbackFormComponent, {
				width: ModalWidth.M,
				disableClose: true,
			})
			.afterClosed()
			.subscribe({
				next: (isFeedbackCreated?: boolean) => {
					if (isFeedbackCreated) {
						const isFeedbackListOpened = this.router.url.indexOf(`/${AppRoutes.Feedback}`) === 0;
						if (isFeedbackListOpened) {
							this.refreshFeedbackPage.next();
						}
					}
				},
			});
	}

	public openReportDetails(feedback: FeedbackInfo, images?: ImageContent[]): MatDialogRef<FeedbackDetailsComponent> {
		return this.dialog.open(FeedbackDetailsComponent, { width: ModalWidth.M, data: { feedback, images } });
	}
}
