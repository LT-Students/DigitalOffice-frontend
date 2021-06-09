/* tslint:disable */
/* eslint-disable */
import { User } from './user';

/**
 * Specific department data.
 */
export interface DepartmentInfo {

  /**
   * Department description.
   */
  description?: string;
  director?: User;

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
  users?: Array<User>;
}

