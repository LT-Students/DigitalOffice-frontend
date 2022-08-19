import { Injectable } from '@angular/core';
import { FeedbackApiService } from '@api/feedback-service/services/feedback-api.service';
import { FeedbackApiService as FeedbackGatewayApiService } from '@api/gateway-service/services/feedback-api.service';
import { FeedbackType } from '@api/gateway-service/models/feedback-type';
import { ImageContent } from '@api/gateway-service/models/image-content';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { MAX_INT32 } from '@app/utils/utils';
import { FindResultResponseFeedbackInfo } from '@api/feedback-service/models/find-result-response-feedback-info';

@Injectable({
	providedIn: 'root',
})
export class FeedbackService {
	constructor(private feedbackApi: FeedbackApiService, private feedbackGatewayApi: FeedbackGatewayApiService) {}

	public createReport(
		type: FeedbackType,
		comment: string,
		images: ImageContent[] = []
	): Observable<OperationResultResponse> {
		return this.feedbackGatewayApi.createFeedback({ body: { type, content: comment, feedbackImages: images } });
	}

	public findReports(): Observable<FindResultResponseFeedbackInfo> {
		return this.feedbackApi.findFeedbacks({ skipCount: 0, takeCount: MAX_INT32 });
	}

	public getReport(feedbackId: string) {
		return this.feedbackApi.getFeedback({ feedbackId });
	}
}
