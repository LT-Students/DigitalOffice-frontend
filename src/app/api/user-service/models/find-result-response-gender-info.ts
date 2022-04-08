/* tslint:disable */
/* eslint-disable */
import { GenderInfo } from './gender-info';
import { OperationResultStatusType } from './operation-result-status-type';

/**
 * Response object for action operations.
 */
export interface FindResultResponseGenderInfo {
	body: Array<GenderInfo>;
	errors: Array<string>;
	status: OperationResultStatusType;
	totalCount: number;
}
