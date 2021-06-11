/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
export interface DepartmentsResponse {

  /**
   * Total number of all departments.
   */
  count?: number;
  departments?: Array<DepartmentInfo>;
  errors?: Array<string>;
}

