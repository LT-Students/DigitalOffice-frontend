/* tslint:disable */
/* eslint-disable */
import { WorkTimeMonthLimitInfo } from './work-time-month-limit-info';
export interface FindResultResponseWorkTimeMonthLimitInfo {
	body?: Array<WorkTimeMonthLimitInfo>;
	errors: Array<string>;

	/**
	 * Total number of finded by filter work times.
	 */
	totalCount: number;
}
