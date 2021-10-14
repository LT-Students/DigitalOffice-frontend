import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Inject,
	OnDestroy,
	OnInit,
	ViewEncapsulation,
} from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import { debounceTime, skip, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of, ReplaySubject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { NewsService } from '@app/services/news/news.service';
import { CreateNewsRequest } from '@data/api/news-service/models/create-news-request';
import { DoValidators } from '@app/validators/do-validators';
import { IOutputBlockData, IOutputData } from '@app/models/editorjs/output-data.interface';
import { LocalStorageService } from '@app/services/local-storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '@app/services/modal.service';
import { OperationResultResponseNewsResponse } from '@data/api/news-service/models/operation-result-response-news-response';
import { NewsPatchOperation } from '@data/api/news-service/models/news-patch-operation';
import { EditNewsRequest } from '@data/api/news-service/models/edit-news-request';
import { CompanyService } from '@app/services/company/company.service';
import { CurrentUserService } from '@app/services/current-user.service';
import { ConfirmDialogData } from '../../../../shared/modals/confirm-dialog/confirm-dialog.component';
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
	public articleSubject: FormControl;

	public isEditorContentEmpty: BehaviorSubject<boolean>;
	public isEdit: boolean;
	public companyName: string;
	private _editor?: EditorJS;
	private _editorObserver?: MutationObserver;
	private _destroy$: ReplaySubject<void>;

	constructor(
		@Inject(MAT_DIALOG_DATA) private _newsId: string,
		private _currentUserService: CurrentUserService,
		private _newsService: NewsService,
		private _localStorage: LocalStorageService,
		private _editorConfig: NewsEditorConfig,
		private _dialogRef: MatDialogRef<NewsEditorComponent>,
		private _modalService: ModalService,
		private _elementRef: ElementRef,
		private _companyService: CompanyService
	) {
		this.companyName = this._companyService.getCompanyName();
		this._dialogRef.disableClose = true;
		this.isEdit = Boolean(this._newsId);
		this.isEditorContentEmpty = new BehaviorSubject<boolean>(!this.isEdit);

		this.articleSubject = new FormControl('', [Validators.required, DoValidators.noWhitespaces]);

		this._destroy$ = new ReplaySubject<void>(1);
	}

	public ngOnInit(): void {
		this._initializeEditor()
			.pipe(
				switchMap(() => this._detectEditorChanges()),
				debounceTime(200),
				skip(1),
				takeUntil(this._destroy$),
				switchMap(() => from((this._editor as EditorJS).save())),
				tap((outputData) => {
					if (!this.isEdit) {
						this._saveDraft(outputData);
					}
				})
			)
			.subscribe();

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

	private _initializeEditor(): Observable<OperationResultResponseNewsResponse | null> {
		if (this._newsId) {
			return this._newsService.getNews(this._newsId).pipe(
				tap((response) => {
					console.log(response);
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
		if (this.isEdit) {
			this._editNews();
		} else {
			this._createNews();
		}
	}

	private _createNews(): void {
		let userId: string;
		this._currentUserService.currentUser$
			.pipe(
				tap((user) => (userId = user?.id ?? '')),
				switchMap(() => from((this._editor as EditorJS).save())),
				switchMap((outputData) => {
					const [newsContent, previewContent] = this._prepareOutputData(outputData);
					const news: CreateNewsRequest = {
						authorId: userId,
						subject: this.articleSubject.value.trim(),
						preview: JSON.stringify(previewContent),
						content: JSON.stringify(newsContent),
					};
					return this._newsService.createNews(news);
				})
			)
			.subscribe({
				next: (response) => {
					this._closeAndEmptyDraft(true);
					this._modalService.fullScreen(PostComponent, response.body);
				},
			});
	}

	private _editNews(): void {
		from((this._editor as EditorJS).save())
			.pipe(
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
					return this._newsService.editNews(this._newsId, editRequest);
				})
			)
			.subscribe({ next: () => this._closeAndEmptyDraft(true) });
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
