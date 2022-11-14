import { ChangeDetectionStrategy, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { ArticleResponse } from '@api/wiki-service/models';
import { ArticlePath, PatchDocument } from '@app/types/edit-request';
import { LoadingState } from '@app/utils/loading-state';
import { DialogService } from '@shared/component/dialog/dialog.service';
import { Icons } from '@shared/modules/icons/icons';
import { WikiApiService, WikiStateService } from '../services';
import { ArticleEditorComponent } from '../shared/article-editor/article-editor.component';

@Component({
	selector: 'do-article-page',
	templateUrl: './article-page.component.html',
	styleUrls: ['./article-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePageComponent implements OnInit {
	public readonly Icons = Icons;

	@ViewChildren(ArticleEditorComponent) editor!: QueryList<ArticleEditorComponent>;

	private article$ = this.route.data.pipe(map((data) => data['article'] as ArticleResponse));
	public state$ = combineLatest([this.article$, this.wikiTree.tree$]).pipe(
		map(([article, tree]) => ({ article, tree }))
	);

	public editorControl = this.fb.nonNullable.control({ title: '', content: '' });
	public isEditMode = false;
	public loadingState = new LoadingState();

	constructor(
		private dialog: DialogService,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private wikiApi: WikiApiService,
		private wikiTree: WikiStateService
	) {}

	public ngOnInit(): void {
		this.article$.subscribe((article) => {
			const value = { title: article.name, content: article.content };
			this.editorControl.setValue(value);
		});
	}

	public handleArticleChange(articleId: string): void {
		this.router.navigate(['..', articleId], { relativeTo: this.route });
	}

	public onEdit(): void {
		this.isEditMode = true;
	}

	public onCancel(): void {
		this.canLeavePage().subscribe();
	}

	public onSubmit(): void {
		if (this.editorControl.invalid) {
			return;
		}
		this.article$.pipe(first()).subscribe((article) => {
			const editRequest = [];
			const { title, content } = this.editorControl.value;
			if (title !== article.name) {
				editRequest.push(new PatchDocument(title, ArticlePath.Name));
			}
			if (content !== article.content) {
				editRequest.push(new PatchDocument(content, ArticlePath.Content));
			}
			if (editRequest.length) {
				this.wikiApi.editArticle(article.id, editRequest).subscribe();
			}
		});
		this.isEditMode = false;
	}

	public canLeavePage(): Observable<boolean> {
		let result$: Observable<boolean>;
		if (!this.isEditMode) {
			result$ = of(true);
		} else {
			result$ = this.article$.pipe(
				first(),
				switchMap((article) => {
					const { title } = this.editorControl.value;
					if (article.name === title && !this.editor.last?.isDirty) {
						return of(true);
					}
					return this.dialog.confirm({
						title: 'Изменение статьи',
						message: 'Вы действительно хотите отменить изменения?',
						confirmText: 'Да, продолжить',
					}).closed;
				})
			);
		}
		return result$.pipe(tap((canLeave: boolean) => canLeave && (this.isEditMode = false)));
	}
}
