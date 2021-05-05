/* tslint:disable */
/* eslint-disable */
import { UserInfo } from './user-info';
import { UserRoleType } from './user-role-type';
export interface ProjectUserInfo {
  projectId?: string;
  role?: UserRoleType;
  user?: UserInfo;
}

