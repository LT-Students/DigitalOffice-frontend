/* tslint:disable */
/* eslint-disable */
import { CommunicationType } from './communication-type';
export interface EditCommunicationRequest {
	/**
	 * allows to establish the confirmed communication as BaseEmail.
	 */
	type?: null | CommunicationType;

	/**
	 * new the communication value
	 */
	value?: null | string;
}
