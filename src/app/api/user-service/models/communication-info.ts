/* tslint:disable */
/* eslint-disable */
import { CommunicationType } from './communication-type';
export interface CommunicationInfo {
	id: string;
	isConfirmed: boolean;
	type: CommunicationType;
	value: string;
}
