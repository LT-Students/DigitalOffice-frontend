import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDatepicker } from '@angular/material/datepicker';

import { OperationResultStatusType } from '@data/api/time-service/models';
import { Activities, AttendanceService } from '@app/services/attendance.service';

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
	@ViewChild('dp') monthpicker: MatDatepicker<Date> | undefined;

	public selectedDate$: Observable<Date>;
	public activities$: Observable<Activities>;

	constructor(private _attendanceService: AttendanceService) {
		this.selectedDate$ = _attendanceService.selectedDate$;
		this.activities$ = _attendanceService.activities$;
	}

	public chosenMonthHandler(date: Date, datepicker: MatDatepicker<any>) {
		this._attendanceService.setNewDate(date);
		datepicker.close();
	}
}
