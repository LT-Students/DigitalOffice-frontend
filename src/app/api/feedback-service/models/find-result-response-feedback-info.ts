/* tslint:disable */
/* eslint-disable */
import { FeedbackInfo } from './feedback-info';
export interface FindResultResponseFeedbackInfo {
	body?: Array<FeedbackInfo>;
	errors: Array<string>;

	/**
	 * Total number of finded by filter projects.
	 */
	totalCount: number;
}
