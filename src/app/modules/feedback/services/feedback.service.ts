import { Injectable } from '@angular/core';
import { FeedbackApiService } from '@api/feedback-service/services/feedback-api.service';
import { FeedbackApiService as FeedbackGatewayApiService } from '@api/gateway-service/services/feedback-api.service';
import { FeedbackType } from '@api/gateway-service/models/feedback-type';
import { ImageContent } from '@api/gateway-service/models/image-content';
import { Observable } from 'rxjs';
import { FindResponse, OperationResultResponse } from '@app/types/operation-result-response.interface';
import { map } from 'rxjs/operators';
import { FeedbackResponse } from '@api/feedback-service/models/feedback-response';
import { FeedbackStatusType } from '@api/feedback-service/models/feedback-status-type';
import { FeedbackInfo } from '@api/feedback-service/models/feedback-info';

export interface FindFeedbackParams {
	skipCount: number;
	takeCount: number;
	feedbacktype?: FeedbackType;
	orderbydescending: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class FeedbackService {
	constructor(private feedbackApi: FeedbackApiService, private feedbackGatewayApi: FeedbackGatewayApiService) {}

	public createFeedback(
		type: FeedbackType,
		comment: string,
		images: ImageContent[] = []
	): Observable<OperationResultResponse> {
		return this.feedbackGatewayApi.createFeedback({ body: { type, content: comment, feedbackImages: images } });
	}

	public archiveFeedback(feedbackIds: string[]): Observable<OperationResultResponse> {
		return this.feedbackApi.editFeedbackStatuses({
			body: {
				feedbackIds,
				status: FeedbackStatusType.Archived,
			},
		});
	}

	public findFeedback(params: FindFeedbackParams): Observable<FindResponse<FeedbackInfo>> {
		return this.feedbackApi
			.findFeedbacks({
				...params,
				feedbackstatus: FeedbackStatusType.New,
			})
			.pipe(map((res) => new FindResponse(res)));
	}

	public getFeedback(feedbackId: string): Observable<FeedbackResponse> {
		return this.feedbackApi.getFeedback({ feedbackId }).pipe(map((res) => res.body as FeedbackResponse));
	}
}
