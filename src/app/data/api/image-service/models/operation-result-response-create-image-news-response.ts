/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseCreateImageNewsResponse {
	body?: { imageId?: string; previewId?: string };
	errors?: Array<string>;
	status?: OperationResultStatusType;
}
