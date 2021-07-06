/* tslint:disable */
/* eslint-disable */
export interface AuthenticationResponse {

  /**
   * User access JWT.
   */
  accessToken?: string;

  /**
   * User refresh JWT.
   */
  refreshToken?: string;

  /**
   * User global unique identifier.
   */
  userId?: string;
}

