import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { AttendanceService } from '../../services/attendance.service';
import { LeaveTime } from '../../models/leave-time';

@Pipe({
	name: 'leaveHours',
})
export class LeaveHoursPipe implements PipeTransform {
	constructor(private attendance: AttendanceService) {}

	transform({ startTime, endTime }: LeaveTime): Observable<number> {
		return this.attendance.selectedDate$.pipe(
			map((selectedDate: DateTime) => {
				if (startTime.month !== selectedDate.month || startTime.year !== selectedDate.year) {
					startTime = selectedDate.startOf('month');
				}
				if (endTime.month !== selectedDate.month || endTime.year !== selectedDate.year) {
					endTime = selectedDate.endOf('month');
				}

				return this.attendance.getLeaveDuration(startTime, endTime);
			})
		);
	}
}
