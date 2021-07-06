/* tslint:disable */
/* eslint-disable */
import { RoleInfo } from './role-info';
export interface RolesResponse {

  /**
   * Total number of all roles.
   */
  count?: number;
  errors?: Array<string>;
  roles?: Array<RoleInfo>;
}

