/* tslint:disable */
/* eslint-disable */
import { CommunicationType } from './communication-type';
import { CommunicationVisibleTo } from './communication-visible-to';
export interface CreateCommunicationRequest {
	type: CommunicationType;

	/**
	 * Unique user identifier. Is null if create with user creating
	 */
	userId?: string;

	/**
	 * Communication value
	 */
	value: string;
	visibleTo?: CommunicationVisibleTo;
}
