/* tslint:disable */
/* eslint-disable */
import { FeedbackInfo } from './feedback-info';
import { ImageContent } from './image-content';
export interface FeedbackResponse {
	feedback: FeedbackInfo;
	images?: Array<ImageContent>;
}
