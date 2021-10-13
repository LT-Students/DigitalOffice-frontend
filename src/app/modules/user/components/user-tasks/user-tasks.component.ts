import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDatepicker } from '@angular/material/datepicker';

import { OperationResultStatusType } from '@data/api/time-service/models';
import { Activities, AttendanceService } from '@app/services/attendance.service';
import { DateTime } from 'luxon';

export interface IDialogResponse {
	status?: OperationResultStatusType;
	data?: any;
}

@Component({
	selector: 'do-user-tasks',
	templateUrl: './user-tasks.component.html',
	styleUrls: ['./user-tasks.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTasksComponent {
	@ViewChild('dp') monthpicker: MatDatepicker<DateTime> | undefined;

	public selectedDate$: Observable<DateTime>;
	public activities$: Observable<Activities>;

	constructor(private _attendanceService: AttendanceService) {
		this.selectedDate$ = this._attendanceService.selectedDate$;
		this.activities$ = this._attendanceService.activities$;
	}

	public chosenMonthHandler(date: DateTime) {
		this._attendanceService.setNewDate(date);
	}
}
