import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { FeedbackInfo } from '@api/feedback-service/models/feedback-info';
import { FeedbackService } from './services/feedback.service';
import { FeedbackListQueriesService } from './feedback-list/feedback-list-queries.service';

@Injectable({
	providedIn: 'root',
})
export class FeedbackListResolver implements Resolve<OperationResultResponse<FeedbackInfo[]>> {
	constructor(private feedbackService: FeedbackService, private feedbackListQueries: FeedbackListQueriesService) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<OperationResultResponse<FeedbackInfo[]>> {
		const params = this.feedbackListQueries.convertQueryUrlParamsToEndpointParams(route.queryParams);
		return this.feedbackService.findReports(params);
	}
}
