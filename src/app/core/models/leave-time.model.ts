import { LeaveType } from '@data/api/time-service/models/leave-type';

export interface ILeaveType {
	leaveType?: LeaveType;
	leaveInRussian: string;
	emojiIcon: string;
}

export class LeaveTimeModel {
	private static _leaveTypes: ILeaveType[] = [
		{ leaveType: LeaveType.SickLeave, leaveInRussian: 'Больничный', emojiIcon: '🤧' },
		{ leaveType: LeaveType.Idle, leaveInRussian: 'Отгул', emojiIcon: '💃🏻' },
		{ leaveType: LeaveType.Training, leaveInRussian: 'Обучение', emojiIcon: '👨🏻‍🎓' },
		{ leaveType: LeaveType.Vacation, leaveInRussian: 'Отпуск', emojiIcon: '🏖️' },
	];

	public static getLeaveInfoByLeaveType(leaveType: LeaveType) {
		return this._leaveTypes.find((leave: ILeaveType) => leave.leaveType === leaveType);
	}

	public static getAllLeaveTypes(): ILeaveType[] {
		return this._leaveTypes.slice();
	}
}
