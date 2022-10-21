import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CreateLeaveTime, SubmitLeaveTimeValue } from '@shared/modules/shared-time-tracking-system/models';

@Injectable()
export class CreateLeaveTimeService extends CreateLeaveTime {
	constructor() {
		super();
	}

	public createLeaveTime(
		leaveValue: SubmitLeaveTimeValue,
		initialValue?: Required<SubmitLeaveTimeValue>
	): Observable<any> {
		return of(leaveValue);
	}
}
