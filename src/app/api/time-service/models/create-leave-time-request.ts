/* tslint:disable */
/* eslint-disable */
import { LeaveType } from './leave-type';
export interface CreateLeaveTimeRequest {
	/**
	 * Description for alloted time. Required if leaveType is Prolonged
	 */
	comment?: string;

	/**
	 * End time leave from task with timezone offset.
	 */
	endTime?: string;
	leaveType: LeaveType;
	minutes: number;

	/**
	 * Start time leave from task with timezone offset.
	 */
	startTime: string;

	/**
	 * User working on the current project.
	 */
	userId: string;
}
