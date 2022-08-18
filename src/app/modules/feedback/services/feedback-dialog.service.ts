import { Injectable } from '@angular/core';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { FeedbackInfo } from '@api/feedback-service/models/feedback-info';
import { FeedbackFormComponent } from '../feedback-form/feedback-form.component';
import { ReportDetailsComponent } from '../report-details/report-details.component';

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

	public openReportDetails(report: FeedbackInfo): void {
		this.dialog.open(ReportDetailsComponent, { width: ModalWidth.M, data: report });
	}
}
