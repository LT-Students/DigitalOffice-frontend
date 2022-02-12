/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { ShortWorkspaceInfo } from './short-workspace-info';
export interface FindResultResponseShortWorkspaceInfo {
	body?: null | Array<ShortWorkspaceInfo>;
	errors?: Array<string>;
	status?: OperationResultStatusType;

	/**
	 * Total number of finded by filter workspaces.
	 */
	totalCount?: number;
}
