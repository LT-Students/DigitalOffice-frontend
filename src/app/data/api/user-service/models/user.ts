/* tslint:disable */
/* eslint-disable */
import { UserStatus } from './user-status';
export interface User {

  /**
   * Certificate files global unique identifiers.
   */
  achievementsIds?: null | Array<string>;

  /**
   * File global unique identifier.
   */
  avatarFileId?: null | string;

  /**
   * Certificate files global unique identifiers.
   */
  certificatesIds?: null | Array<string>;

  /**
   * DateTime of creating user
   */
  createdAt?: string;

  /**
   * User mail.
   */
  email?: string;

  /**
   * First name of a user.
   */
  firstName?: string;

  /**
   * User global unique identifier.
   */
  id?: string;

  /**
   * Mark whether the user is an administrator.
   */
  isAdmin?: boolean;

  /**
   * Last name of a user.
   */
  lastName?: string;

  /**
   * Last name of a user.
   */
  middleName?: null | string;
  status?: UserStatus;
}

