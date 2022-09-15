/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
export interface FindResultResponse {
	body?: {};
	errors?: Array<string>;
	status?: OperationResultStatusType;

	/**
	 * Total number of finded by filter news.
	 */
	totalCount?: number;
}
