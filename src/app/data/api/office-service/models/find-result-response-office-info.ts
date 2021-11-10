/* tslint:disable */
/* eslint-disable */
import { OfficeInfo } from './office-info';
import { OperationResultStatusType } from './operation-result-status-type';
export interface FindResultResponseOfficeInfo {
	body?: Array<OfficeInfo>;
	errors?: Array<string>;
	status?: OperationResultStatusType;
	totalCount?: number;
}
