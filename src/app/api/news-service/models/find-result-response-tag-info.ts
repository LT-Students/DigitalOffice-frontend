/* tslint:disable */
/* eslint-disable */
import { OperationResultStatusType } from './operation-result-status-type';
import { TagsInfo } from './tags-info';
export interface FindResultResponseTagInfo {
	body?: Array<TagsInfo>;
	errors?: Array<string>;
	status?: OperationResultStatusType;

	/**
	 * Total number of finded by filter tags.
	 */
	totalCount?: number;
}
