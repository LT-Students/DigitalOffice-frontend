/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { RoleInfo } from './role-info';
import { UserInfo } from './user-info';
export interface OperationResultResponseRoleResponse {
  body?: {
'role'?: RoleInfo;
'users'?: Array<UserInfo>;
};
  errors?: Array<string>;
  status?: OperationResultStatusType;
}

