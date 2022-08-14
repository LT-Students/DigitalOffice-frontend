import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Report } from '../report-list/report-list.service';

@Component({
	selector: 'do-report-details',
	templateUrl: './report-details.component.html',
	styleUrls: ['./report-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDetailsComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public report: Report) {}

	ngOnInit(): void {}
}
