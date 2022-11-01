import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { FeedbackInfo } from '@api/feedback-service/models/feedback-info';
import { finalize, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ImageContent } from '@api/feedback-service/models/image-content';
import { b64toBlob } from '@app/utils/utils';
import { LoadingState } from '@app/utils/loading-state';
import { FeedbackService } from '../services/feedback.service';

@Component({
	selector: 'do-report-details',
	templateUrl: './feedback-details.component.html',
	styleUrls: ['./feedback-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackDetailsComponent extends LoadingState implements OnInit {
	public images$?: Observable<File[]>;
	public feedback!: FeedbackInfo;

	constructor(
		@Inject(DIALOG_DATA) private data: { feedback: FeedbackInfo; images?: ImageContent[] },
		private feedbackService: FeedbackService
	) {
		super();
	}

	public ngOnInit(): void {
		this.feedback = this.data.feedback;
		if (this.data.images) {
			this.images$ = of(this.convertImageContentToFile(this.data.images));
		} else if (this.feedback.imagesCount) {
			this.setLoading(true);
			this.images$ = this.feedbackService.getFeedback(this.feedback.id).pipe(
				map((res) => this.convertImageContentToFile(res.images || [])),
				finalize(() => this.setLoading(false))
			);
		}
	}

	private convertImageContentToFile(imgs: ImageContent[]): File[] {
		return imgs.map((i: ImageContent) => {
			const content = i.content.indexOf('data') === 0 ? i.content.split(',')[1] : i.content;
			return new File([b64toBlob(content)], i.name || '');
		});
	}
}
