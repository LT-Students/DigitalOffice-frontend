/* tslint:disable */
/* eslint-disable */
export interface CreateLeaveTimeRequest {
	/**
	 * Description for alloted time.
	 */
	comment?: string;

	/**
	 * End time leave from task with timezone offset.
	 */
	endTime: string;

	/**
	 * The reason for which lost time.
	 */
	leaveType: 'Vacation' | 'SickLeave' | 'Training' | 'Idle';
	minutes?: number;

	/**
	 * Start time leave from task with timezone offset.
	 */
	startTime?: string;

	/**
	 * User working on the current project.
	 */
	userId: string;
}
