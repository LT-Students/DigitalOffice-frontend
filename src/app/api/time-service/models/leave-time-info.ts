/* tslint:disable */
/* eslint-disable */
import { LeaveType } from './leave-type';
import { ManagerLeaveTimeInfo } from './manager-leave-time-info';
import { UserInfo } from './user-info';
export interface LeaveTimeInfo {
	/**
	 * Description for alloted time.
	 */
	comment?: string;
	createdAtUtc: string;
	createdBy: string;

	/**
	 * Task finish deadline.
	 */
	endTime: string;

	/**
	 * The leave time Id.
	 */
	id: string;
	isActive: boolean;
	isClosed: boolean;
	leaveType: LeaveType;
	managerInfo?: UserInfo;
	managerLeaveTime?: ManagerLeaveTimeInfo;
	minutes: number;

	/**
	 * Start date task execution.
	 */
	startTime: string;
}
