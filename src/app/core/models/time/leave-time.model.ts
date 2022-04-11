import { LeaveType } from '@api/time-service/models/leave-type';
import { LeaveTimeInfo } from '@api/time-service/models/leave-time-info';

interface ILeaveTimeInfo {
	comment?: string;
	createdAt: string;
	createdBy: string;
	endTime: string;
	id: string;
	isActive: boolean;
	leaveType: LeaveType;
	minutes: number;
	startTime: string;
}

export class LeaveTimeModel implements ILeaveTimeInfo {
	public id: string;
	public createdAt: string;
	public createdBy: string;
	public isActive: boolean;
	public startTime: string;
	public endTime: string;
	public minutes: number;
	public leaveType: LeaveType;
	public comment?: string;

	constructor(leaveTime: LeaveTimeInfo) {
		this.id = leaveTime.id ?? '';
		this.createdAt = leaveTime.createdAt ?? new Date().toISOString();
		this.createdBy = leaveTime.createdBy ?? '';
		this.isActive = leaveTime.isActive ?? false;
		this.startTime = leaveTime.startTime ?? new Date().toISOString();
		this.endTime = leaveTime.endTime ?? new Date().toISOString();
		this.minutes = leaveTime.minutes ?? 0;
		this.leaveType = leaveTime.leaveType ?? LeaveType.Idle;
		this.comment = leaveTime.comment;
	}

	get hours(): number {
		return this.minutes / 60;
	}
}
