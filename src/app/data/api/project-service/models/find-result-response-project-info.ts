/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { ProjectInfo } from './project-info';
export interface FindResultResponseProjectInfo {
	body?: Array<ProjectInfo>;
	errors?: Array<string>;
	status?: OperationResultStatusType;

	/**
	 * Total number of finded by filter projects.
	 */
	totalCount?: number;
}
