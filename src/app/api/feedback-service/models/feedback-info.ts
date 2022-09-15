/* tslint:disable */
/* eslint-disable */
import { FeedbackStatusType } from './feedback-status-type';
import { FeedbackType } from './feedback-type';
export interface FeedbackInfo {
	/**
	 * Feedback content.
	 */
	content: string;

	/**
	 * Data and time created feedback.
	 */
	createdAtUtc: any;

	/**
	 * Unique feedback identifier.
	 */
	id: string;
	imagesCount: number;

	/**
	 * Full name of feedback creator
	 */
	senderFullName: string;

	/**
	 * Unique feedback creator identifier.
	 */
	senderId: string;
	status: FeedbackStatusType;
	type: FeedbackType;
}
