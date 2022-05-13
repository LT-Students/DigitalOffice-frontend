/* tslint:disable */
/* eslint-disable */
export interface ReconstructPasswordRequest {

  /**
   * User login.
   */
  login: string;

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

