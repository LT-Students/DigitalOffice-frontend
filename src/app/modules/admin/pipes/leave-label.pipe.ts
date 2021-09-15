import { Pipe, PipeTransform } from '@angular/core'
import { ILeaveType, LeaveTimeModel } from '@app/models/leave-time.model';
import { LeaveType } from '@data/api/time-service/models';

@Pipe({
    name: 'leaveLabel'
})
export class LeaveLabelPipe implements PipeTransform {
    transform(leaveType: LeaveType | undefined, emoji: boolean = true, label: boolean = true): string {
        const leaveModel: ILeaveType | undefined = LeaveTimeModel.getLeaveInfoByLeaveType(leaveType!);
        return `${emoji ? leaveModel?.emojiIcon : ''} ${label ? leaveModel?.leaveInRussian : ''}`;
    }
}