/* tslint:disable */
/* eslint-disable */
import { ChannelInfo } from './channel-info';
import { OperationResultStatusType } from './operation-result-status-type';
import { TagsInfo } from './tags-info';
import { UserInfo } from './user-info';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseNewsResponse {
	body?: {
		id: string;
		preview: string;
		content: string;
		subject: string;
		publisher?: UserInfo;
		creator?: UserInfo;
		channel?: ChannelInfo;
		tags?: Array<TagsInfo>;
		isActive: boolean;
		publishedAtUtc?: string | null;
		createdAtUtc: string;
	};
	errors: Array<string>;
	status?: OperationResultStatusType;
}
