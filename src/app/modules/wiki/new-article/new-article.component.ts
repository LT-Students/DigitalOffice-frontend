import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoadingState } from '@app/utils/loading-state';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { WikiApiService } from '../services';

@Component({
	selector: 'do-new-article',
	templateUrl: './new-article.component.html',
	styleUrls: ['./new-article.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewArticleComponent implements OnDestroy {
	public form = this.fb.nonNullable.group({
		article: [{ title: '', content: '' }],
		rubricId: [''],
	});
	public loadingState = new LoadingState();

	private destroy$ = new Subject();

	constructor(
		private fb: FormBuilder,
		private wikiApi: WikiApiService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public onCancel(): void {}

	public onSave(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}
		this.loadingState.setLoading(true);

		const { title, content } = this.form.getRawValue().article;
		const rubricId = this.form.getRawValue().rubricId;
		this.wikiApi
			.createArticle(rubricId, title, content)
			.pipe(finalize(() => this.loadingState.setLoading(false)))
			.subscribe((id: string) => this.router.navigate(['..', id], { relativeTo: this.route }));
	}
}
