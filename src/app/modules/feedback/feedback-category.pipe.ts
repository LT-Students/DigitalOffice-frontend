import { Pipe, PipeTransform } from '@angular/core';
import { FeedbackType as FeedbackTypeApi } from '@api/feedback-service/models/feedback-type';
import { FeedbackType } from './models/feedback-type';

@Pipe({
	name: 'feedbackCategory',
})
export class FeedbackCategoryPipe implements PipeTransform {
	transform(type: FeedbackTypeApi): string {
		return FeedbackType.getFeedbackInfoByFeedbackType(type).label;
	}
}
