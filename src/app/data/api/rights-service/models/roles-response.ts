/* tslint:disable */
/* eslint-disable */
import { RoleInfo } from './role-info';
export interface RolesResponse {
  errors?: Array<string>;
  roles?: Array<RoleInfo>;

  /**
   * Total number of all roles.
   */
  totalCount?: number;
}

