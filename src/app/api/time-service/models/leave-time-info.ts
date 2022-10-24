/* tslint:disable */
/* eslint-disable */
import { LeaveType } from './leave-type';
export interface LeaveTimeInfo {
	/**
	 * Description for alloted time.
	 */
	comment?: string;
	createdAt?: string;
	createdBy: string;

	/**
	 * Task finish deadline.
	 */
	endTime?: string;

	/**
	 * The leave time Id.
	 */
	id: string;
	isActive: boolean;
	isClosed: boolean;
	leaveType: LeaveType;
	minutes: number;

	/**
	 * Start date task execution.
	 */
	startTime?: string;
}
