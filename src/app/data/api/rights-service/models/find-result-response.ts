/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
export interface FindResultResponse {
	body?: Array<any>;
	errors?: Array<string>;
	status?: OperationResultStatusType;

	/**
	 * Total number of all roles.
	 */
	totalCount?: number;
}
