/* tslint:disable */
/* eslint-disable */
import { WorkTimeResponse } from './work-time-response';
export interface FindResultResponseWorkTimeResponse {
	body?: Array<WorkTimeResponse>;
	errors: Array<string>;

	/**
	 * Total number of finded by filter work times.
	 */
	totalCount: number;
}
