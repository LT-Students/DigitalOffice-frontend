import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DateTime } from 'luxon';
import {
	MAX_FUTURE_DATE_FOR_LEAVE_TIME,
	CanManageTimeInSelectedDate,
} from '@shared/modules/shared-time-tracking-system/models';
import { AttendanceStoreService } from '../../services';

@Component({
	selector: 'do-user-tasks',
	templateUrl: './user-tasks.component.html',
	styleUrls: ['./user-tasks.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTasksComponent {
	public readonly maxDate = MAX_FUTURE_DATE_FOR_LEAVE_TIME;
	public selectedDate$ = this.canManageTime.selectedDate$;
	public activities$ = this.attendanceStore.activities$;
	public canEdit$ = this.canManageTime.canEdit$;

	constructor(private attendanceStore: AttendanceStoreService, private canManageTime: CanManageTimeInSelectedDate) {}

	public chosenMonthHandler(date: DateTime): void {
		this.canManageTime.setNewDate(date);
	}
}
