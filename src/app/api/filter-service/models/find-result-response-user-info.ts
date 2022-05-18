/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { UserInfo } from './user-info';

/**
 * Response object for action operations.
 */
export interface FindResultResponseUserInfo {
	body?: Array<UserInfo>;
	errors: Array<string>;
	status: OperationResultStatusType;
	totalCount: number;
}
