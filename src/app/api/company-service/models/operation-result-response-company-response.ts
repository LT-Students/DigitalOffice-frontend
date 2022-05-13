/* tslint:disable */
/* eslint-disable */
import { CompanyResponse } from './company-response';
import { OperationResultStatusType } from './operation-result-status-type';
export interface OperationResultResponseCompanyResponse {
  body?: CompanyResponse;
  errors: Array<string>;
  status: OperationResultStatusType;
}

