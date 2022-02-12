/* tslint:disable */
/* eslint-disable */
import { StatusType } from './status-type';
export interface CreateMessageRequest {
	/**
	 * The channel unique identifier.
	 */
	channelId: string;

	/**
	 * The message content.
	 */
	content: string;
	status: StatusType;
}
