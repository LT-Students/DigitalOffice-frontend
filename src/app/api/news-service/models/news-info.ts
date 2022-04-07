/* tslint:disable */
/* eslint-disable */
import { ChannelInfo } from './channel-info';
import { TagsInfo } from './tags-info';
import { UserInfo } from './user-info';
export interface NewsInfo {
	channel?: ChannelInfo;
	createdAtUtc?: string;
	creator?: UserInfo;
	id: string;
	isActive: boolean;
	preview: string;
	publishedAtUtc: string;
	publisher?: UserInfo;
	subject: string;
	tags?: Array<TagsInfo>;
}
