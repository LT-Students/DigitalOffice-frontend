import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FeedbackDialogService } from '../feedback-dialog.service';
import { Report, ReportListService, reports } from './report-list.service';

@Component({
	selector: 'do-report-list',
	templateUrl: './report-list.component.html',
	styleUrls: ['./report-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ReportListService],
})
export class ReportListComponent implements OnInit {
	public tableOptions = this.reportList.getTableOptions();
	public dataSource = reports;

	constructor(private reportList: ReportListService, private feedbackDialog: FeedbackDialogService) {}

	ngOnInit(): void {}

	public handleRowClick(report: Report): void {
		this.feedbackDialog.openReportDetails(report);
	}
}
