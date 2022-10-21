import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateLeaveTime, SubmitLeaveTimeValue } from '@shared/modules/shared-time-tracking-system/models';
import { AttendanceService } from './attendance.service';

@Injectable()
export class CreateLeaveTimeService extends CreateLeaveTime {
	constructor(private attendance: AttendanceService) {
		super();
	}

	public createLeaveTime(
		leaveValue: SubmitLeaveTimeValue,
		initialValue?: Required<SubmitLeaveTimeValue>
	): Observable<string> {
		return this.attendance.submitLeaveTime(leaveValue, initialValue);
	}
}
