/* tslint:disable */
/* eslint-disable */
import { BaseDepartmentInfo } from './base-department-info';
import { DepartmentUserInfo } from './department-user-info';
export interface NewDepartmentRequest {
  info: BaseDepartmentInfo;
  users?: Array<DepartmentUserInfo>;
}

