/* tslint:disable */
/* eslint-disable */
export interface ReconstructPasswordRequest {
	/**
	 * New user password.
	 */
	newPassword: string;

	/**
	 * Secret from email.
	 */
	secret: string;

	/**
	 * Unique user identifier.
	 */
	userId: string;
}
