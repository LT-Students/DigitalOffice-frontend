/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
export interface DepartmentResponse {

  /**
   * Total number of all departments.
   */
  count?: number;
  departments?: Array<DepartmentInfo>;
  errors?: Array<string>;
}

