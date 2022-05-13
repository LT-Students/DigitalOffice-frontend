/* tslint:disable */
/* eslint-disable */
import { ContractTerm } from './contract-term';
export interface CreateCompanyUserRequest {
  companyId: string;
  contractSubjectId?: string;
  contractTermType: ContractTerm;
  endWorkingAt?: string;
  probation?: string;
  rate?: number;
  startWorkingAt: string;
  userId: string;
}

