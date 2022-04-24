/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { UserStatInfo } from './user-stat-info';
export interface StatInfo {
  departmentInfo?: DepartmentInfo;
  usersStats?: Array<UserStatInfo>;
}

