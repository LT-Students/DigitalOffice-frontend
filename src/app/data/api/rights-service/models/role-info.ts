/* tslint:disable */
/* eslint-disable */
import { RightResponse } from './right-response';
import { UserInfo } from './user-info';
export interface RoleInfo {
  createdAt?: string;
  createdBy?: string;
  description?: null | string;
  id?: string;
  name?: string;
  rights?: Array<RightResponse>;
  users?: Array<UserInfo>;
}

