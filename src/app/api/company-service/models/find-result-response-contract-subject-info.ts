/* tslint:disable */
/* eslint-disable */
import { ContractSubjectInfo } from './contract-subject-info';
import { OperationResultStatusType } from './operation-result-status-type';

/**
 * Response object for action operations.
 */
export interface FindResultResponseContractSubjectInfo {
	body?: Array<ContractSubjectInfo>;
	errors?: Array<string>;
	status?: OperationResultStatusType;
	totalCount?: number;
}
