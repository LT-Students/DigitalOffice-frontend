import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DateTime } from 'luxon';
import { AttendanceService } from '../../services/attendance.service';

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
