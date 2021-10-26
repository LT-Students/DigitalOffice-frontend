/* tslint:disable */
/* eslint-disable */
import { ImageConsist } from './image-consist';
import { OperationResultStatusType } from './operation-result-status-type';
export interface FindResultResponseAchievementInfo {
	body?: { id?: string; name?: string; description?: string; image?: ImageConsist; createdatutc?: string };
	errors?: Array<string>;
	status?: OperationResultStatusType;

	/**
	 * Total number of finded by filter achievement.
	 */
	totalCount?: number;
}
