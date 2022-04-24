/* tslint:disable */
/* eslint-disable */
export interface CredentialsResponse {
  accessToken: string;

  /**
   * AccessToken life time in minutes
   */
  accessTokenExpiresIn: number;
  refreshToken: string;

  /**
   * RefreshToken life time in minutes
   */
  refreshTokenExpiresIn: number;
  userId: string;
}

