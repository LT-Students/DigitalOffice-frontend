import { Observable } from 'rxjs';
import { SubmitLeaveTimeValue } from '@shared/modules/shared-time-tracking-system/models/types';

export abstract class CreateLeaveTime {
	public abstract createLeaveTime(
		leaveValue: SubmitLeaveTimeValue,
		initialValue?: Required<SubmitLeaveTimeValue>
	): Observable<any>;
}
