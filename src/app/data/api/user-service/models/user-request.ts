/* tslint:disable */
/* eslint-disable */
export interface UserRequest {

  /**
   * File global unique identifier.
   */
  avatarFileId?: null | string;

  /**
   * User mail.
   */
  email: string;

  /**
   * First name of a user.
   */
  firstName: string;

  /**
   * User global unique identifier.
   */
  id?: string;

  /**
   * Mark whether the user is an active.
   */
  isActive: boolean;

  /**
   * Mark whether the user is an administrator.
   */
  isAdmin: boolean;

  /**
   * Last name of a user.
   */
  lastName: string;

  /**
   * User login.
   */
  login: string;

  /**
   * Last name of a user.
   */
  middleName?: null | string;

  /**
   * User password.
   */
  password: string;

  /**
   * User status.
   */
  status?: null | string;
}

