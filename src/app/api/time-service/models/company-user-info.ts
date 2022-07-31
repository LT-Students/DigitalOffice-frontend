/* tslint:disable */
/* eslint-disable */
import { ContractSubjectData } from './contract-subject-data';
export interface CompanyUserInfo {
	contractSubjectData?: ContractSubjectData;
	rate?: number;

	/**
	 * Start user's working date.
	 */
	startWorkingAt: string;
}
