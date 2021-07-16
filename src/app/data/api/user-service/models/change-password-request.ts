/* tslint:disable */
/* eslint-disable */
export interface ChangePasswordRequest {

  /**
   * User login.
   */
  login?: string;

  /**
   * New user password.
   */
  newPassword?: string;
  secret?: string;

  /**
   * Unique user identifier.
   */
  userId?: string;
}

