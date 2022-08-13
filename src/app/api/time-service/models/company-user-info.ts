/* tslint:disable */
/* eslint-disable */
import { ContractSubjectData } from './contract-subject-data';
export interface CompanyUserInfo {
	contractSubject?: ContractSubjectData;
	rate?: number;

	/**
	 * Start user's working date.
	 */
	startWorkingAt: string;
}
