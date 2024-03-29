import { LeaveType } from '@api/time-service/models/leave-type';
import { LeaveTimeInfo } from '@api/time-service/models/leave-time-info';
import { DateTime } from 'luxon';

export class LeaveTime {
	public id: string;
	public createdAt: DateTime;
	public createdBy: string;
	public isActive: boolean;
	public startTime: DateTime;
	public endTime: DateTime;
	public minutes: number;
	public leaveType: LeaveType;
	public comment?: string;

	constructor(leaveTime: LeaveTimeInfo) {
		this.id = leaveTime.id;
		this.createdAt = leaveTime.createdAtUtc ? DateTime.fromISO(leaveTime.createdAtUtc) : DateTime.now();
		this.createdBy = leaveTime.createdBy;
		this.isActive = leaveTime.isActive;
		this.startTime = leaveTime.startTime ? DateTime.fromISO(leaveTime.startTime) : DateTime.now();
		this.endTime = leaveTime.endTime ? DateTime.fromISO(leaveTime.endTime) : DateTime.now();
		this.minutes = leaveTime.minutes;
		this.leaveType = leaveTime.leaveType;
		this.comment = leaveTime.comment;
	}

	get hours(): number {
		return this.minutes / 60;
	}
}
