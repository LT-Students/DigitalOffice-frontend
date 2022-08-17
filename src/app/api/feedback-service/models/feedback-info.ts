/* tslint:disable */
/* eslint-disable */
import { FeedbackStatusType } from './feedback-status-type';
import { FeedbackType } from './feedback-type';
export interface FeedbackInfo {
	/**
	 * Data and time changed feedback.
	 */
	changedAtUtc: any;

	/**
	 * Unique identifier of person changed feedback.
	 */
	changedBy: any;

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
