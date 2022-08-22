/* tslint:disable */
/* eslint-disable */
export interface AuthenticationResponse {
	/**
	 * User access JWT.
	 */
	accessToken?: string;

	/**
	 * AccessToken life time in minutes
	 */
	accessTokenExpiresIn?: number;

	/**
	 * User refresh JWT.
	 */
	refreshToken?: string;

	/**
	 * RefreshToken life time in minutes
	 */
	refreshTokenExpiresIn?: number;

	/**
	 * User global unique identifier.
	 */
	userId?: string;
}
