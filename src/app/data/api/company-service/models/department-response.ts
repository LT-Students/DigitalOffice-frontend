/* tslint:disable */
/* eslint-disable */
import { DepartmentUserInfo } from './department-user-info';
import { ProjectInfo } from './project-info';
import { ShortDepartmentInfo } from './short-department-info';

/**
 * Full departmant information.
 */
export interface DepartmentResponse {
  department?: ShortDepartmentInfo;
  projects?: ProjectInfo;
  users?: DepartmentUserInfo;
}

