import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	Inject,
	OnDestroy,
	OnInit,
	ViewEncapsulation,
} from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import { finalize, first, skip, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, from, iif, Observable, of, ReplaySubject } from 'rxjs';
import { UntypedFormControl, Validators } from '@angular/forms';
import { NewsService } from '@app/services/news/news.service';
import { CreateNewsRequest } from '@api/news-service/models/create-news-request';
import { DoValidators } from '@app/validators/do-validators';
import { LocalStorageService } from '@app/services/local-storage.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from '@app/services/dialog.service';
import { NewsPatchOperation } from '@api/news-service/models/news-patch-operation';
import { EditNewsRequest } from '@api/news-service/models/edit-news-request';
import { CurrentUserService } from '@app/services/current-user.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { User } from '@app/models/user/user.model';
import { ConfirmDialogData } from '@shared/dialogs/confirm-dialog/confirm-dialog.component';
import { IOutputBlockData, IOutputData } from '../../models/output-data.interface';
import { PostComponent } from '../post/post.component';
import { NewsEditorConfig } from './news-editor.config';

interface NewsDraft {
	subject: string;
	data: IOutputData;
}

@Component({
	selector: 'do-news-editor',
	templateUrl: './news-editor.component.html',
	styleUrls: ['./news-editor.component.scss', '../../editorjs-plugins/block-tunes/preview/index.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class NewsEditorComponent implements OnInit, OnDestroy {
	public articleSubject: UntypedFormControl;
	public loading$$: BehaviorSubject<boolean>;

	public isEditorContentEmpty: BehaviorSubject<boolean>;
	public isEdit: boolean;
	private _editor?: EditorJS;
	private _editorObserver?: MutationObserver;
	private _destroy$: ReplaySubject<void>;

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: { _newsId: string; openedFromPost?: boolean },
		private _currentUserService: CurrentUserService,
		private _newsService: NewsService,
		private _localStorage: LocalStorageService,
		private _editorConfig: NewsEditorConfig,
		private _dialogRef: MatDialogRef<NewsEditorComponent>,
		private _modalService: DialogService,
		private _elementRef: ElementRef,
		private _cdr: ChangeDetectorRef
	) {
		this.loading$$ = new BehaviorSubject<boolean>(false);
		this._dialogRef.disableClose = true;
		this.isEdit = Boolean(this.data._newsId);
		this.isEditorContentEmpty = new BehaviorSubject<boolean>(!this.isEdit);

		this.articleSubject = new UntypedFormControl('', [Validators.required, DoValidators.noWhitespaces]);

		this._destroy$ = new ReplaySubject<void>(1);
	}

	public ngOnInit(): void {
		this._initializeEditor()
			.pipe(
				switchMap(() => this._detectEditorChanges()),
				// debounceTime(200),
				skip(1),
				takeUntil(this._destroy$),
				switchMap(() => from((this._editor as EditorJS).save())),
				tap((outputData) => {
					this.isEditorContentEmpty.next(!outputData.blocks.length);
					if (!this.isEdit) {
						this._saveDraft(outputData);
					}
				})
			)
			.subscribe(() => {
				this._cdr.markForCheck();
			});

		this._dialogRef.keydownEvents().subscribe((event) => {
			if (event.key === 'Escape') {
				this.onEditorClose();
			}
		});
	}

	public ngOnDestroy(): void {
		this._editorObserver?.disconnect();
		this._destroy$.next();
		this._destroy$.complete();
	}

	private _initializeEditor(): Observable<OperationResultResponse | null> {
		if (this.data._newsId) {
			return this._newsService.getNews(this.data._newsId).pipe(
				tap((response) => {
					this.articleSubject.setValue(response.body?.subject);
					const newsContent: IOutputData = { blocks: JSON.parse(response.body?.content as string) };
					this._editor = new EditorJS(this._editorConfig.createConfig(newsContent));
				})
			);
		} else {
			const isDraft = this._localStorage.get('news_draft');
			const draft: NewsDraft | undefined = isDraft ? JSON.parse(isDraft) : undefined;
			this.articleSubject.setValue(draft?.subject ?? '');
			this._editor = new EditorJS(this._editorConfig.createConfig(draft?.data));
			return of(null);
		}
	}

	private _saveDraft(outputData: IOutputData): void {
		this.isEditorContentEmpty.next(!outputData.blocks.length);
		const draft: NewsDraft = {
			subject: this.articleSubject.value,
			data: outputData,
		};
		this._localStorage.set('news_draft', JSON.stringify(draft));
	}

	public onEnterPressed(event: Event): void {
		event.preventDefault();
		this._editor?.blocks.insert(undefined, undefined, undefined, 0, true);
		this._editor?.caret.setToFirstBlock();
	}

	public onEditorClose(): void {
		const confirmDialogData: ConfirmDialogData = {
			title: 'Закрытие новости',
			message:
				'Вы действительно хотите закрыть новость до публикации? Введенная вами информация не будет сохранена.',
			confirmText: 'Да, закрыть',
		};
		this._modalService
			.confirm(confirmDialogData)
			.afterClosed()
			.subscribe({
				next: (hasClosed) => {
					if (hasClosed) {
						this._closeAndEmptyDraft();
					}
				},
			});
	}

	private _closeAndEmptyDraft(shouldUpdate = false): void {
		this._localStorage.remove('news_draft');
		this._dialogRef.close(shouldUpdate);
	}

	public onSubmit(): void {
		this.loading$$.next(true);
		iif(() => this.isEdit, this._editNews(), this._createNews())
			.pipe(finalize(() => this.loading$$.next(false)))
			.subscribe({
				next: () => {
					this._closeAndEmptyDraft(true);
					if (this.isEdit && !this.data.openedFromPost) {
						this._modalService.fullScreen(PostComponent, this.data._newsId);
					}
				},
			});
	}

	private _createNews(): Observable<OperationResultResponse<any>> {
		let userId: string;
		return this._currentUserService.user$.pipe(
			first((user: User) => !!user.id),
			tap((user: User) => (userId = user.id as string)),
			switchMap(() => from((this._editor as EditorJS).save())),
			switchMap((outputData) => {
				const [newsContent, previewContent] = this._prepareOutputData(outputData);
				const news: CreateNewsRequest = {
					subject: this.articleSubject.value.trim(),
					preview: JSON.stringify(previewContent),
					content: JSON.stringify(newsContent),
					tagsIds: [],
					isActive: true,
				};
				return this._newsService.createNews(news);
			})
		);
	}

	private _editNews(): Observable<OperationResultResponse<any>> {
		return from((this._editor as EditorJS).save()).pipe(
			switchMap((outputData) => {
				const [newsContent, previewContent] = this._prepareOutputData(outputData);
				const editRequest: EditNewsRequest = [
					{ op: 'replace', path: '/Content', value: JSON.stringify(newsContent) },
					{ op: 'replace', path: '/Preview', value: JSON.stringify(previewContent) },
				];
				if (this.articleSubject.dirty) {
					const subject: NewsPatchOperation = {
						op: 'replace',
						path: '/Subject',
						value: this.articleSubject.value,
					};
					editRequest.push(subject);
				}
				return this._newsService.editNews(this.data._newsId, editRequest);
			})
		);
	}

	private _prepareOutputData(outputData: IOutputData): [IOutputBlockData[], IOutputBlockData[]] {
		const newsContent: IOutputBlockData[] = outputData.blocks;
		const previewBlocks = outputData.blocks.filter((block) => block.tunes?.previewTune.preview);
		let previewContent: IOutputBlockData[];
		if (previewBlocks.length > 0) {
			previewContent = previewBlocks;
		} else {
			const firstParagraph = outputData.blocks.find((block) => block.type === 'paragraph');
			previewContent = firstParagraph
				? [{ ...firstParagraph, data: { text: firstParagraph.data.text.slice(0, 520) } }]
				: [];
		}
		return [newsContent, previewContent];
	}

	private _detectEditorChanges(): Observable<MutationRecord[]> {
		return new Observable((observer) => {
			const editorDom = document.querySelector('#editorjs') as Element;
			const config = { attributes: true, childList: true, subtree: true };

			this._editorObserver = new MutationObserver((mutation) => {
				observer.next(mutation);
			});

			this._editorObserver.observe(editorDom, config);
		});
	}
}
