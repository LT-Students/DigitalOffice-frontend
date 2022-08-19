/* tslint:disable */
/* eslint-disable */
import { FeedbackResponse } from './feedback-response';

/**
 * Response object for action operations.
 */
export interface OperationResultResponseFeedbackResponse {
	body?: FeedbackResponse;
	errors: Array<string>;
}
