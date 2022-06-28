import { LeaveType } from '@api/time-service/models/leave-type';
import { Icons } from '@shared/features/icons/icons';

export interface ILeaveType {
	leaveType: LeaveType;
	label: string;
	icon: Icons;
}

export class LeaveTimeType {
	private static leaveTypes: ILeaveType[] = [
		{ leaveType: LeaveType.SickLeave, label: 'На больничном', icon: Icons.Sick },
		{ leaveType: LeaveType.Idle, label: 'Отгул', icon: Icons.Smile },
		{ leaveType: LeaveType.Training, label: 'Обучение', icon: Icons.SelfImprovement },
		{ leaveType: LeaveType.Vacation, label: 'В отпуске', icon: Icons.Vacation },
	];

	public static getLeaveInfoByLeaveType(leaveType: LeaveType): ILeaveType {
		return this.leaveTypes.find((leave: ILeaveType) => leave.leaveType === leaveType) as ILeaveType;
	}

	public static getAllLeaveTypes(): ILeaveType[] {
		return this.leaveTypes.slice();
	}
}
