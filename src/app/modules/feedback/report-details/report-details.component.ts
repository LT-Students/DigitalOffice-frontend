import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeedbackInfo } from '@api/feedback-service/models/feedback-info';

@Component({
	selector: 'do-report-details',
	templateUrl: './report-details.component.html',
	styleUrls: ['./report-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDetailsComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public report: FeedbackInfo) {}

	ngOnInit(): void {}
}
