/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { DepartmentUser } from './department-user';
export interface DepartmentRequest {
  info: DepartmentInfo;

  /**
   * Department users.
   */
  users?: null | Array<DepartmentUser>;
}
