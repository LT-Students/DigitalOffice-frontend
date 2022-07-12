/* tslint:disable */
/* eslint-disable */
import { StatInfo } from './stat-info';
export interface FindResultResponseStatInfo {
	body?: Array<StatInfo>;
	errors: Array<string>;

	/**
	 * Total number of finded users by filter.
	 */
	totalCount: number;
}
