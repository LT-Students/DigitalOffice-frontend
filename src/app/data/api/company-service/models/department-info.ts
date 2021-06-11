/* tslint:disable */
/* eslint-disable */
import { UserInfo } from './user-info';

/**
 * Specific department data.
 */
export interface DepartmentInfo {

  /**
   * Department description.
   */
  description?: string;
  director?: UserInfo;

  /**
   * Department id.
   */
  id?: string;

  /**
   * Department name.
   */
  name?: string;

  /**
   * Workers of this department.
   */
  users?: Array<UserInfo>;
}

