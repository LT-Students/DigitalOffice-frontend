/* tslint:disable */
/* eslint-disable */
import { ImageInfo } from './image-info';
import { UserInfo } from './user-info';
export interface MessageInfo {
	content?: string;
	createdAtUtc?: string;
	createdBy?: null | UserInfo;
	filesIds?: null | Array<string>;
	id?: string;
	images?: null | Array<ImageInfo>;
	status?: number;
	threadMessagesCount?: number;
}
