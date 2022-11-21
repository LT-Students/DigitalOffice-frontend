import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingState } from '@app/utils/loading-state';
import { BrowserStorage } from '@app/models/browserStorage';
import { WikiApiService } from '../services';
import { CREATE_FORM_NODE_KEY, WikiNodeType } from '../models';
import {
	CreateNodeFormValue,
	CreateWikiNodeFormComponent,
} from '../shared/create-wiki-node-form/create-wiki-node-form.component';

@Component({
	selector: 'do-new-article',
	templateUrl: './new-article.component.html',
	styleUrls: ['./new-article.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewArticleComponent implements OnInit, OnDestroy {
	@ViewChild(CreateWikiNodeFormComponent) nodeForm!: CreateWikiNodeFormComponent;

	public form = this.fb.nonNullable.group({
		article: [{ title: '', content: '' }],
		path: this.fb.control<CreateNodeFormValue | null>({
			nodeType: WikiNodeType.Article,
			rubricId: null,
			subRubricId: null,
			name: '',
		}),
	});
	public loadingState = new LoadingState();

	private destroy$ = new Subject();

	constructor(
		private fb: FormBuilder,
		private wikiApi: WikiApiService,
		private router: Router,
		private route: ActivatedRoute,
		private storage: BrowserStorage
	) {}

	public ngOnInit(): void {
		const jsonFormValue = this.storage.get(CREATE_FORM_NODE_KEY);
		if (jsonFormValue) {
			const parsedValue = JSON.parse(jsonFormValue);
			this.form.patchValue({ path: parsedValue });
		}
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
		this.storage.remove(CREATE_FORM_NODE_KEY);
	}

	public onCancel(): void {
		this.router.navigate(['..'], { relativeTo: this.route });
	}

	public onSave(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}
		this.loadingState.setLoading(true);

		const { title, content } = this.form.getRawValue().article;
		const { rubricId, subRubricId } = this.form.getRawValue().path as CreateNodeFormValue;
		const parentId = subRubricId || (rubricId as string);
		this.wikiApi
			.createArticle(parentId, title, content)
			.pipe(finalize(() => this.loadingState.setLoading(false)))
			.subscribe((id: string) => this.router.navigate(['..', id], { relativeTo: this.route }));
	}
}
