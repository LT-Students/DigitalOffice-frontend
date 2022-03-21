/* tslint:disable */
/* eslint-disable */
import { CommunicationInfo } from './communication-info';
import { ImageInfo } from './image-info';
import { UserStatus } from './user-status';
export interface UserInfo {
	avatar?: null | ImageInfo;
	firstName?: string;
	id?: string;
	isActive?: boolean;
	isAdmin?: boolean;
	lastName?: string;
	middleName?: null | string;
	status?: UserStatus;
	communications?: null | Array<CommunicationInfo>;
}
