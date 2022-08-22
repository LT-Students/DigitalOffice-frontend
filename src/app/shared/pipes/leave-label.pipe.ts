import { Pipe, PipeTransform } from '@angular/core';
import { ILeaveType, LeaveTypeModel } from '@app/models/time/leave-type.model';
import { LeaveType } from '@api/time-service/models';

@Pipe({
	name: 'leaveLabel',
})
export class LeaveLabelPipe implements PipeTransform {
	transform(leaveType: LeaveType | undefined, emoji: boolean = true, label: boolean = true): string {
		if (!leaveType) return '';
		else {
			const leaveModel: ILeaveType | undefined = LeaveTypeModel.getLeaveInfoByLeaveType(leaveType);
			return `${emoji ? leaveModel?.emojiIcon : ''} ${label ? leaveModel?.leaveInRussian : ''}`;
		}
	}
}
