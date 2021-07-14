/* tslint:disable */
/* eslint-disable */
import { DepartmentResponse } from './department-response';
import { OperationResultStatusType } from './operation-result-status-type';
export interface OperationResultResponseDepartmentInfo {
  body?: DepartmentResponse;
  errors?: Array<string>;
  status?: OperationResultStatusType;
}

