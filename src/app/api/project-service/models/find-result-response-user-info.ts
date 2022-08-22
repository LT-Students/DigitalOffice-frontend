/* tslint:disable */
/* eslint-disable */
import { UserInfo } from './user-info';
export interface FindResultResponseUserInfo {
	body?: Array<UserInfo>;
	errors: Array<string>;

	/**
	 * Total number of finded by filter users.
	 */
	totalCount: number;
}
