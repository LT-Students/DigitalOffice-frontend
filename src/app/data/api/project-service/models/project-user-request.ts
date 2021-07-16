/* tslint:disable */
/* eslint-disable */
import { UserRoleType } from './user-role-type';
export interface ProjectUserRequest {
  role: UserRoleType;

  /**
   * Unique user identifier.
   */
  userId: string;
}

