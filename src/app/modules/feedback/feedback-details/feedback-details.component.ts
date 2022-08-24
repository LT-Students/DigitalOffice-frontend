import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeedbackInfo } from '@api/feedback-service/models/feedback-info';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ImageContent } from '@api/feedback-service/models/image-content';
import { LoadingState } from '@shared/directives/button-loading.directive';
import { b64toBlob } from '@app/utils/utils';
import { FeedbackService } from '../services/feedback.service';

@Component({
	selector: 'do-report-details',
	templateUrl: './feedback-details.component.html',
	styleUrls: ['./feedback-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackDetailsComponent extends LoadingState implements OnInit {
	public images$?: Observable<File[]>;

	constructor(@Inject(MAT_DIALOG_DATA) public report: FeedbackInfo, private feedbackService: FeedbackService) {
		super();
	}

	public ngOnInit(): void {
		if (this.report.imagesCount) {
			this.setLoading(true);
			this.images$ = this.feedbackService.getReport(this.report.id).pipe(
				map((res) =>
					(res.images || []).map((i: ImageContent) => {
						const content = i.content.indexOf('data') === 0 ? i.content.split(',')[1] : i.content;
						return new File([b64toBlob(content)], i.name || '');
					})
				),
				finalize(() => this.setLoading(false))
			);
		}
	}
}
