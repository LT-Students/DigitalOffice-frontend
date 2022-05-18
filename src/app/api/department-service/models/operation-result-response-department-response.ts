/* tslint:disable */
/* eslint-disable */
import { DepartmentResponse } from './department-response';
import { OperationResultStatusType } from './operation-result-status-type';
export interface OperationResultResponseDepartmentResponse {
  body?: DepartmentResponse;
  errors: Array<string>;
  status: OperationResultStatusType;
}

