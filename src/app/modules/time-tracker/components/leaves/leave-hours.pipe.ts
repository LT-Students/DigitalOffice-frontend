import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import {
	CanManageTimeInSelectedDate,
	LeaveTimeAndDatepickerManagement,
} from '@shared/modules/shared-time-tracking-system/models';
import { LeaveTime } from '../../models';

@Pipe({
	name: 'leaveHours',
})
export class LeaveHoursPipe implements PipeTransform {
	constructor(
		private canManageTime: CanManageTimeInSelectedDate,
		private leaveTimeDatepicker: LeaveTimeAndDatepickerManagement
	) {}

	transform({ startTime, endTime }: LeaveTime): Observable<number> {
		return this.canManageTime.selectedDate$.pipe(
			map((selectedDate: DateTime) => {
				if (startTime.month !== selectedDate.month || startTime.year !== selectedDate.year) {
					startTime = selectedDate.startOf('month');
				}
				if (endTime.month !== selectedDate.month || endTime.year !== selectedDate.year) {
					endTime = selectedDate.endOf('month');
				}

				return this.leaveTimeDatepicker.getLeaveDuration(startTime, endTime);
			})
		);
	}
}
