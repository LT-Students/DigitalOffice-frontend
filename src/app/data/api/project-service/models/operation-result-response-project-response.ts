/* tslint:disable */
/* eslint-disable */
import { ImageInfo } from './image-info';
import { OperationResultStatusType } from './operation-result-status-type';
import { ProjectInfo } from './project-info';
import { UserInfo } from './user-info';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseProjectResponse {
	body?: { project?: ProjectInfo; users?: Array<UserInfo>; files?: Array<string>; images?: Array<ImageInfo> };
	errors?: Array<string>;
	status?: OperationResultStatusType;
}
