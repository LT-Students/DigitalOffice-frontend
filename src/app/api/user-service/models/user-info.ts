/* tslint:disable */
/* eslint-disable */
import { CommunicationInfo } from './communication-info';
import { ImageInfo } from './image-info';
import { PendingUserInfo } from './pending-user-info';
export interface UserInfo {
	avatar?: ImageInfo;
	communications?: Array<CommunicationInfo>;
	firstName: string;
	id: string;
	isActive: boolean;
	isAdmin: boolean;
	lastName: string;
	middleName?: string;
	pendingInfo?: PendingUserInfo;
}
