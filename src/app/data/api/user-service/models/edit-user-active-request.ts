/* tslint:disable */
/* eslint-disable */
export interface EditUserActiveRequest {
	/**
	 * used when restoring a user from an archive
	 */
	communicationId?: string;
	isActive: boolean;
	userId: string;
}
