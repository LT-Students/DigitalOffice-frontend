/* tslint:disable */
/* eslint-disable */
import { Department } from './department';
import { DepartmentUser } from './department-user';
export interface AddDepartmentRequest {
  info: Department;
  users?: Array<DepartmentUser>;
}

