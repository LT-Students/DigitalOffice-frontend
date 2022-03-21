import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { OperationResultStatusType } from '@api/time-service/models';
import { DateTime } from 'luxon';
import { Activities, AttendanceService } from '../../services/attendance.service';

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
