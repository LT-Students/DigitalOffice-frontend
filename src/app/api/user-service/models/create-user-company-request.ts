/* tslint:disable */
/* eslint-disable */
import { ContractTerm } from './contract-term';
export interface CreateUserCompanyRequest {

  /**
   * User company ID.
   */
  companyId: string;

  /**
   * User's contract subject ID.
   */
  contractSubjectId?: string;
  contractTermType: ContractTerm;

  /**
   * Time when the user will end working for the company.
   */
  endWorkingAt?: string;

  /**
   * User's probation.
   */
  probation?: string;

  /**
   * User's rate
   */
  rate?: number;

  /**
   * Time when the user started working for the company.
   */
  startWorkingAt: string;
}

