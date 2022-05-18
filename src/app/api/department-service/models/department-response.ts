/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { DepartmentUserInfo } from './department-user-info';
import { ProjectInfo } from './project-info';

/**
 * Full departmant information.
 */
export interface DepartmentResponse {
  department: DepartmentInfo;
  projects?: Array<ProjectInfo>;
  users?: Array<DepartmentUserInfo>;
}

