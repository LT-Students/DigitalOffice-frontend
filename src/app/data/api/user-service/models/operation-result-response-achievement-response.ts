/* tslint:disable */
/* eslint-disable */
import { ImageConsist } from './image-consist';
import { OperationResultStatusType } from './operation-result-status-type';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseAchievementResponse {
	body?: {
		id?: string;
		name?: string;
		description?: string;
		image?: ImageConsist;
		createdatutc?: string;
		createdby?: string;
	};
	errors?: Array<string>;
	status?: OperationResultStatusType;
}
