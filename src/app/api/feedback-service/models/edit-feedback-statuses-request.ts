/* tslint:disable */
/* eslint-disable */
import { FeedbackStatusType } from './feedback-status-type';
export interface EditFeedbackStatusesRequest {
	feedbackIds: Array<string>;
	status: FeedbackStatusType;
}
