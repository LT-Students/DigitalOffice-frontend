/* tslint:disable */
/* eslint-disable */
import { ChannelInfo } from './channel-info';
import { OperationResultStatusType } from './operation-result-status-type';
export interface FindResultResponseChannelInfo {
	body?: Array<ChannelInfo>;
	errors?: Array<string>;
	status?: OperationResultStatusType;

	/**
	 * Total number of finded by filter channels.
	 */
	totalCount?: number;
}
