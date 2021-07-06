/* tslint:disable */
/* eslint-disable */
import { CompanyInfo } from './company-info';
import { OperationResultStatusType } from './operation-result-status-type';
export interface OperationResultResponseCompanyInfo {
  body?: CompanyInfo;
  errors?: Array<string>;
  status?: OperationResultStatusType;
}

