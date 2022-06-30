/* tslint:disable */
/* eslint-disable */
import { CommunicationType } from './communication-type';
import { CommunicationVisibleTo } from './communication-visible-to';
export interface CommunicationInfo {
	id: string;
	isConfirmed: boolean;
	type: CommunicationType;
	value: string;
	visibleTo: CommunicationVisibleTo;
}
