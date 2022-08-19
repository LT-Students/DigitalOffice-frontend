import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FeedbackInfo } from '@api/feedback-service/models/feedback-info';
import { FeedbackDialogService } from '../services/feedback-dialog.service';
import { FeedbackService } from '../services/feedback.service';
import { ReportListService } from './report-list.service';

@Component({
	selector: 'do-report-list',
	templateUrl: './report-list.component.html',
	styleUrls: ['./report-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ReportListService],
})
export class ReportListComponent implements OnInit {
	public tableOptions = this.reportList.getTableOptions();
	public dataSource = this.feedbackService.findReports();

	constructor(
		private reportList: ReportListService,
		private feedbackDialog: FeedbackDialogService,
		private feedbackService: FeedbackService
	) {}

	ngOnInit(): void {}

	public handleRowClick(report: FeedbackInfo): void {
		this.feedbackDialog.openReportDetails(report);
	}
}
