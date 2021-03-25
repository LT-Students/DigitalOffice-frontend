/* tslint:disable */
/* eslint-disable */
import { UserConnection } from './user-connection';
import { UserStatus } from './user-status';
export interface UserRequest {
  /**
   * File global unique identifier.
   */
  avatarFileId?: null | string;
  connections?: Array<UserConnection>;

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
  isActive?: boolean;

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
   * Array of user skills
   */
  skills?: null | Array<string>;
  status?: UserStatus;
}
