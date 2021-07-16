/* tslint:disable */
/* eslint-disable */
import { DepartmentUserInfo } from './department-user-info';

/**
 * Specific department data.
 */
export interface ShortDepartmentInfo {

  /**
   * Department description.
   */
  description?: null | string;
  director?: null | DepartmentUserInfo;

  /**
   * Department id.
   */
  id?: string;
  isActive?: boolean;

  /**
   * Department name.
   */
  name?: string;
}

