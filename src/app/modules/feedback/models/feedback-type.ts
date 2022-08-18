import { FeedbackType as FeedbackTypeApi } from '@api/feedback-service/models/feedback-type';

export interface FeedbackTypeInfo {
	type: FeedbackTypeApi;
	label: string;
}

export class FeedbackType {
	private static feedbackTypeInfos: FeedbackTypeInfo[] = [
		{ type: FeedbackTypeApi.Bug, label: 'Сломалось' },
		{ type: FeedbackTypeApi.Wishes, label: 'Пожелание' },
		{ type: FeedbackTypeApi.Other, label: 'Другое' },
	];

	public static getFeedbackInfoByFeedbackType(feedbackType: FeedbackTypeApi): FeedbackTypeInfo {
		return (
			this.feedbackTypeInfos.find((t: FeedbackTypeInfo) => t.type === feedbackType) || this.feedbackTypeInfos[0]
		);
	}

	public static getAllFeedbackTypeInfos(): FeedbackTypeInfo[] {
		return this.feedbackTypeInfos.slice();
	}
}
