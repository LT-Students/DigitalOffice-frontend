import { Injectable } from '@angular/core';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { Report } from './report-list/report-list.service';

@Injectable({
	providedIn: 'root',
})
export class FeedbackDialogService {
	constructor(private dialog: DialogService) {}

	public openFeedbackForm(): void {
		this.dialog.open(FeedbackFormComponent, {
			width: ModalWidth.M,
			disableClose: false,
		});
	}

	public openReportDetails(report: Report): void {
		this.dialog.open(ReportDetailsComponent, { width: ModalWidth.M, data: report });
	}
}
