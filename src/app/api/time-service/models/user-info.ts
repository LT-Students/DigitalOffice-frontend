/* tslint:disable */
/* eslint-disable */

/**
 * User data.
 */
export interface UserInfo {
	firstName?: string;
	id: string;
	isActive?: boolean;
	lastName?: string;
	middleName?: string;
	rate?: number;

	/**
	 * Start user's working date.
	 */
	startWorkingAt?: string;
}
