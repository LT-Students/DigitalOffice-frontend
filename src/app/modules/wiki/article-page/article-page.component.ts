import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	QueryList,
	ViewChildren,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { finalize, first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { LoadingState } from '@app/utils/loading-state';
import { DialogService } from '@shared/component/dialog/dialog.service';
import { Icons } from '@shared/modules/icons/icons';
import { WikiStateService } from '../services';
import { ArticleEditorComponent } from '../shared/article-editor/article-editor.component';

@Component({
	selector: 'do-article-page',
	templateUrl: './article-page.component.html',
	styleUrls: ['./article-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePageComponent implements OnInit, OnDestroy {
	public readonly Icons = Icons;

	@ViewChildren(ArticleEditorComponent) editor!: QueryList<ArticleEditorComponent>;

	public state$ = combineLatest([this.state.activeArticle$, this.state.tree$]).pipe(
		map(([article, tree]) => ({ article, tree }))
	);

	public editorControl = this.fb.nonNullable.control({ title: '', content: '' });
	public isEditMode = false;
	public loadingState = new LoadingState();

	private destroy$ = new Subject();

	constructor(
		private cdr: ChangeDetectorRef,
		private dialog: DialogService,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private state: WikiStateService
	) {}

	public ngOnInit(): void {
		this.state.activeArticle$.pipe(takeUntil(this.destroy$)).subscribe((article) => {
			const value = { title: article.name, content: article.content };
			this.editorControl.setValue(value);
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public handleArticleChange(articleId: string): void {
		this.router.navigate(['..', articleId], { relativeTo: this.route });
	}

	public onEdit(): void {
		this.isEditMode = true;
	}

	public onCancel(): void {
		this.closeEditMode().subscribe();
	}

	public onSubmit(): void {
		if (this.editorControl.invalid) {
			return;
		}
		this.loadingState.setLoading(true);
		this.state
			.updateArticle(this.editorControl.value)
			.pipe(finalize(() => this.loadingState.setLoading(false)))
			.subscribe(() => {
				this.isEditMode = false;
			});
	}

	public closeEditMode(): Observable<boolean> {
		let result$: Observable<boolean>;
		if (!this.isEditMode) {
			result$ = of(true);
		} else {
			result$ = this.state.activeArticle$.pipe(
				first(),
				switchMap((article) => {
					const { title } = this.editorControl.value;
					if (article.name === title && !this.isEditorDirty()) {
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
		return result$.pipe(
			tap((canLeave: boolean) => {
				if (canLeave) {
					this.isEditMode = false;
					this.cdr.markForCheck();
				}
			})
		);
	}

	private isEditorDirty(): boolean {
		return this.editor.last.isDirty;
	}
}
