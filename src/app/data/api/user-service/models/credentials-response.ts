/* tslint:disable */
/* eslint-disable */
export interface CredentialsResponse {
  accessToken?: string;
  refreshToken?: string;
  userId?: string;

  /**
   * AccessToken life time in minutes
   */
  accessTokenExpiresIn?: number;

  /**
   * RefreshToken life time in minutes
   */
  refreshTokenExpiresIn?: number;
}

