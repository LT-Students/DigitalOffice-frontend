import { ChangeDetectionStrategy, Component } from '@angular/core';

import { OperationResultStatusType } from '@api/time-service/models';
import { DateTime } from 'luxon';
import { AttendanceService } from '../../services/attendance.service';

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
	public selectedDate$ = this.attendanceService.selectedDate$;
	public activities$ = this.attendanceService.activities$;
	public canEdit$ = this.attendanceService.canEdit$;

	constructor(private attendanceService: AttendanceService) {}

	public chosenMonthHandler(date: DateTime): void {
		this.attendanceService.setNewDate(date);
	}
}
