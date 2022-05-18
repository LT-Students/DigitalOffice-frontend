/* tslint:disable */
/* eslint-disable */
import { DepartmentUserInfo } from './department-user-info';

/**
 * Specific department data.
 */
export interface DepartmentInfo {
  countUsers: number;

  /**
   * Department description.
   */
  description?: string;
  director?: DepartmentUserInfo;

  /**
   * Department id.
   */
  id: string;
  isActive: boolean;

  /**
   * Department name.
   */
  name: string;
}

