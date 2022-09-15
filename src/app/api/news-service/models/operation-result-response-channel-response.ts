/* tslint:disable */
/* eslint-disable */
import { ImageConsist } from './image-consist';
import { NewsInfo } from './news-info';
import { OperationResultStatusType } from './operation-result-status-type';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseChannelResponse {
	body?: {
		id: string;
		name: string;
		pinnedMessage?: string;
		pinnedNewsId?: string | null;
		image?: ImageConsist;
		news?: Array<NewsInfo>;
	};
	errors?: Array<string>;
	status?: OperationResultStatusType;
}
