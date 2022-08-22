/* tslint:disable */
/* eslint-disable */
import { FeedbackType } from './feedback-type';
import { ImageContent } from './image-content';
export interface CreateFeedbackRequest {
	content: string;
	feedbackImages: Array<ImageContent>;
	type: FeedbackType;
}
