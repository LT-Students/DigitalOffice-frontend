import { LeaveType } from '@data/api/time-service/models/leave-type';

export interface ILeaveType {
	leaveType: LeaveType;
	leaveInRussian: string;
}

export class LeaveTimeModel {
	private static _leaveTypes: ILeaveType[] = [
		{ leaveType: LeaveType.SickLeave, leaveInRussian: 'Больничный' },
		{ leaveType: LeaveType.Idle, leaveInRussian: 'Отгул' },
		{ leaveType: LeaveType.Training, leaveInRussian: 'Обучение' },
		{ leaveType: LeaveType.Vacation, leaveInRussian: 'Отпуск' },
	];

	public static getLeaveInfoByLeaveType(leaveType: LeaveType) {
		return this._leaveTypes.find((leave: ILeaveType) => leave.leaveType === leaveType);
	}

	public static getAllLeaveTypes(): ILeaveType[] {
		return this._leaveTypes.slice();
	}
}
