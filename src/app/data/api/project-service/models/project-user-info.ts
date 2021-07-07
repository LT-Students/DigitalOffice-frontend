/* tslint:disable */
/* eslint-disable */
import { UserRoleType } from './user-role-type';
export interface ProjectUserInfo {

  /**
   * Data and time added user to project.
   */
  addedOn?: any;

  /**
   * The user first name
   */
  firstName?: string;

  /**
   * Unique project identifier.
   */
  id?: string;

  /**
   * User state.
   */
  isActive?: boolean;

  /**
   * The user last name.
   */
  lastName?: string;

  /**
   * The user middle name.
   */
  middleName?: string;

  /**
   * Data and time removed user from project.
   */
  removedOn?: any;
  role?: UserRoleType;
}

