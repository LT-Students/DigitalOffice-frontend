/* tslint:disable */
/* eslint-disable */
import { UserStatInfo } from './user-stat-info';
export interface FindResultResponseUserStatInfo {
	body?: Array<UserStatInfo>;
	errors: Array<string>;

	/**
	 * Total number of finded users by filter.
	 */
	totalCount: number;
}
