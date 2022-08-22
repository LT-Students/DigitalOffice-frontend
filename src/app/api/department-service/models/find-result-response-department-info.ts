/* tslint:disable */
/* eslint-disable */
import { DepartmentInfo } from './department-info';
import { OperationResultStatusType } from './operation-result-status-type';
export interface FindResultResponseDepartmentInfo {
  body?: Array<DepartmentInfo>;
  errors: Array<string>;
  status: OperationResultStatusType;
  totalCount: number;
}

