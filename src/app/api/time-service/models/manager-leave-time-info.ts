/* tslint:disable */
/* eslint-disable */
import { LeaveType } from './leave-type';
export interface ManagerLeaveTimeInfo {
	/**
	 * Description for alloted time.
	 */
	comment?: string;
	createdAtUtc: string;

	/**
	 * Task finish deadline.
	 */
	endTime: string;
	isActive: boolean;
	isClosed: boolean;
	leaveType: LeaveType;
	minutes: number;

	/**
	 * Start date task execution.
	 */
	startTime: string;
}
