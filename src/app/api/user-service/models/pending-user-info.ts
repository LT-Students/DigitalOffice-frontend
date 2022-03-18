/* tslint:disable */
/* eslint-disable */
import { UserInfo } from './user-info';
export interface PendingUserInfo {
	/**
	 * communication to which an invitation with a password was sent.
	 */
	invintationCommunicationId?: string;
	userInfo?: UserInfo;
}
