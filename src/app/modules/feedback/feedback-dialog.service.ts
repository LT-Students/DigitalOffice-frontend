import { Injectable } from '@angular/core';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

@Injectable({
	providedIn: 'root',
})
export class FeedbackDialogService {
	constructor(private dialog: DialogService) {}

	public openFeedbackForm(): void {
		this.dialog.open(FeedbackFormComponent, {
			width: ModalWidth.M,
		});
	}
}
