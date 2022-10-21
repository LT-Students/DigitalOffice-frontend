import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateLeaveTime, SubmitLeaveTimeValue } from '@shared/modules/shared-time-tracking-system/models';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { TimeApiService } from '../services';
import { AddLeaveTimeDialogData } from './add-leave-time-dialog.component';

@Injectable()
export class CreateLeaveTimeService extends CreateLeaveTime {
	private readonly userId: string;

	constructor(@Inject(DIALOG_DATA) data: AddLeaveTimeDialogData, private timeApi: TimeApiService) {
		super();
		this.userId = data.userId;
	}

	public createLeaveTime(
		leaveValue: SubmitLeaveTimeValue,
		initialValue?: Required<SubmitLeaveTimeValue>
	): Observable<any> {
		return this.timeApi.createLeaveTime(this.userId, leaveValue);
	}
}
