/* tslint:disable */
/* eslint-disable */
import { LeaveTimeResponse } from './leave-time-response';
export interface FindResultResponseLeaveTimeResponse {
	body?: Array<LeaveTimeResponse>;
	errors: Array<string>;

	/**
	 * Total number of finded by filter leave times.
	 */
	totalCount: number;
}
