/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { ProjectResponse } from './project-response';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseProjectResponse {
	body?: ProjectResponse;
	errors: Array<string>;
	status: OperationResultStatusType;
}
