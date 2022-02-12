/* tslint:disable */
/* eslint-disable */
import { ImageConsist } from './image-consist';
import { MessageInfo } from './message-info';
import { OperationResultStatusType } from './operation-result-status-type';
import { UserInfo } from './user-info';
export interface OperationResultResponseChannelInfo {
	body?: {
		id?: string;
		avatar?: ImageConsist;
		name?: string;
		isPrivate?: boolean;
		users?: Array<UserInfo>;
		Messages?: Array<MessageInfo>;
	};
	errors?: Array<string>;
	status?: OperationResultStatusType;
}
