/* tslint:disable */
/* eslint-disable */
import { CompanyInfo } from './company-info';
import { ContractSubjectData } from './contract-subject-data';
import { ContractTerm } from './contract-term';
export interface CompanyUserInfo {
	company: CompanyInfo;
	contractSubject?: ContractSubjectData;
	contractTermType: ContractTerm;
	endWorkingAt?: string;
	probation?: string;
	rate?: number;
	startWorkingAt: string;
}
