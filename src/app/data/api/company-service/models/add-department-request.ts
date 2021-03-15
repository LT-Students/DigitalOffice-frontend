/* tslint:disable */
/* eslint-disable */
import { DepartmentRequest } from './department-request';
export interface AddDepartmentRequest {
  info: DepartmentRequest;

  /**
   * List specific users id.
   */
  usersIds: Array<string>;
}

