/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { PositionInfo } from './position-info';
export interface FindResultResponsePositionInfo {
	body?: Array<PositionInfo>;
	errors?: Array<string>;
	status?: OperationResultStatusType;
	totalCount?: number;
}
