/* tslint:disable */
/* eslint-disable */
import { AddImageRequest } from './add-image-request';
import { CommunicationInfo } from './communication-info';
import { UserGender } from './user-gender';
import { UserStatus } from './user-status';
export interface CreateUserRequest {
  avatarImage?: AddImageRequest;

  /**
   * User city.
   */
  city?: null | string;

  /**
   * Minimum one communication with type Email must be added.
   */
  communications: Array<CommunicationInfo>;

  /**
   * Date of user birth.
   */
  dayOfBirth?: null | string;

  /**
   * User department ID.
   */
  departmentId?: null | string;

  /**
   * First name of a user.
   */
  firstName: string;
  gender: UserGender;

  /**
   * Mark whether the user is an administrator.
   */
  isAdmin?: null | boolean;

  /**
   * Last name of a user.
   */
  lastName: string;

  /**
   * Middle name of a user.
   */
  middleName?: null | string;

  /**
   * User password.
   */
  password?: null | string;

  /**
   * User position ID.
   */
  positionId: string;

  /**
   * User rate
   */
  rate: number;

  /**
   * Time when the user started working for the company.
   */
  startWorkingAt?: null | string;
  status: UserStatus;
}

