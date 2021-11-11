/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { RightInfo } from './right-info';
export interface OperationResultResponseRights {
	body?: Array<RightInfo>;
	errors?: Array<string>;
	status?: OperationResultStatusType;
}
