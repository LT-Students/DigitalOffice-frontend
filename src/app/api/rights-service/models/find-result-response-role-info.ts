/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { RoleInfo } from './role-info';
export interface FindResultResponseRoleInfo {
  body?: Array<RoleInfo>;
  errors?: Array<string>;
  status?: OperationResultStatusType;

  /**
   * Total number of all roles.
   */
  totalCount?: number;
}

