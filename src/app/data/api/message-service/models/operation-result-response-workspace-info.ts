/* tslint:disable */
/* eslint-disable */
import { ImageConsist } from './image-consist';
import { OperationResultStatusType } from './operation-result-status-type';
import { ShortChannelInfo } from './short-channel-info';
import { UserInfo } from './user-info';
export interface OperationResultResponseWorkspaceInfo {
	errors?: Array<string>;
	status?: OperationResultStatusType;
	body?: {
		id?: string;
		name?: string;
		description?: string;
		isActive?: boolean;
		image?: ImageConsist;
		createdBy?: UserInfo;
		createdAtUtc?: string;
		users?: Array<UserInfo>;
		channels?: Array<ShortChannelInfo>;
	};
}
