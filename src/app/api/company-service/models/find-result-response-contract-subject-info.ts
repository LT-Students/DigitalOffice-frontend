/* tslint:disable */
/* eslint-disable */
import { ContractSubjectInfo } from './contract-subject-info';

/**
 * Response object for action operations.
 */
export interface FindResultResponseContractSubjectInfo {
	body?: Array<ContractSubjectInfo>;
	errors: Array<string>;
	totalCount: number;
}
