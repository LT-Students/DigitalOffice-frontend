/* tslint:disable */
/* eslint-disable */
import { CommunicationInfo } from './communication-info';
import { UserStatus } from './user-status';
export interface CreateUserRequest {

  /**
   * Avatar image file content encoded in base64 string.
   */
  avatarImage?: null | string;

  /**
   * Minimum one communication with type Email must be added.
   */
  communications: Array<CommunicationInfo>;

  /**
   * User department ID.
   */
  departmentId?: null | string;

  /**
   * First name of a user.
   */
  firstName: string;

  /**
   * Mark whether the user is an administrator.
   */
  isAdmin?: null | boolean;

  /**
   * Last name of a user.
   */
  lastName: string;

  /**
   * Last name of a user.
   */
  middleName?: null | string;

  /**
   * User password.
   */
  password: string;

  /**
   * User position ID.
   */
  positionId?: null | string;

  /**
   * User rate
   */
  rate: number;

  /**
   * Time when the user started working for the company.
   */
  startWorkingAt: string;
  status: UserStatus;
}

