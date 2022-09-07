/* tslint:disable */
/* eslint-disable */
import { UserInfo } from './user-info';

/**
 * Response object for action operations.
 */
export interface FindResultResponseUserInfo {
	body?: Array<UserInfo>;
	errors: Array<string>;
	totalCount: number;
}
