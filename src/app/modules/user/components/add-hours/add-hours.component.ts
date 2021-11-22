import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AttendanceService } from '@app/services/attendance.service';
// import { MAT_DATE_FORMATS } from '@angular/material/core';
// import { DateTime } from 'luxon';
// import { RANGE_DATE_FORMAT } from '@app/configs/date-formats';

@Component({
	selector: 'do-add-hours',
	templateUrl: './add-hours.component.html',
	styleUrls: ['./add-hours.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	// providers: [{ provide: MAT_DATE_FORMATS, useValue: RANGE_DATE_FORMAT }],
})
export class AddHoursComponent {
	public isWorktimeForm: boolean;

	constructor(private _attendanceService: AttendanceService) {
		this.isWorktimeForm = true;
	}

	public toggleFormType(isWorktimeForm: boolean): void {
		this.isWorktimeForm = isWorktimeForm;
	}
}
