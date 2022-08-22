/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { UnsentEmailInfo } from './unsent-email-info';

/**
 * Response object for action operations.
 */
export interface FindResultResponseUnsentEmailInfo {
	body?: Array<UnsentEmailInfo>;
	errors?: Array<string>;
	status?: OperationResultStatusType;
	totalCount?: number;
}
