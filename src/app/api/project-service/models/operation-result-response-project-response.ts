/* tslint:disable */
/* eslint-disable */
import { FileAccess } from './file-access';
import { ImageInfo } from './image-info';
import { OperationResultStatusType } from './operation-result-status-type';
import { ProjectInfo } from './project-info';
import { UserInfo } from './user-info';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseProjectResponse {
	body?: {
		project?: ProjectInfo;
		users?: Array<UserInfo> | null;
		files?: Array<FileAccess> | null;
		images?: Array<ImageInfo> | null;
	};
	errors?: Array<string>;
	status?: OperationResultStatusType;
}
