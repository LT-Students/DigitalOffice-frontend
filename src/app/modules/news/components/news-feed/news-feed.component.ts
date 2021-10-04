import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, HostListener, Inject, ChangeDetectorRef } from '@angular/core';
import { EMPTY, from } from 'rxjs';
import { concatMap, map, switchMap, tap, toArray } from 'rxjs/operators';

import { IFindNewsRequest, NewsService } from '@app/services/news/news.service';
import { ArticlePreview } from '@app/models/news.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService } from '@app/services/modal.service';
import { EditorJSParser } from '../../parser';
import { PostComponent } from '../post/post.component';
import { NewsEditorComponent } from '../news-editor/news-editor.component';
import { ConfirmDialogModel } from '../../../../shared/modals/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'do-news-feed',
	templateUrl: './news-feed.component.html',
	styleUrls: ['./news-feed.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFeedComponent implements OnInit {
	public articlePreviews: ArticlePreview[];

	public fixedTags: boolean;
	private _newsCount: number;
	private _totalCount: number;

	constructor(
		@Inject(DOCUMENT) private _document: Document,
		private _modalService: ModalService,
		private _newsService: NewsService,
		private _cdr: ChangeDetectorRef,
		private _editorJSParser: EditorJSParser,
		private _snackBar: MatSnackBar
	) {
		this.fixedTags = false;
		this._newsCount = 0;
		this._totalCount = 0;
		this.articlePreviews = [];
	}

	@HostListener('window: scroll', [])
	public onWindowScroll(): void {
		if (this._document.documentElement.scrollTop >= 100) {
			this.fixedTags = true;
		} else {
			this.fixedTags = false;
		}
	}

	public ngOnInit(): void {
		this._getArticlePreviews();
	}

	public getData(): void {
		if (this._newsCount < this._totalCount) {
			this._getArticlePreviews();
		}
	}

	private _getArticlePreviews(): void {
		let params: IFindNewsRequest = {
			skipCount: this._newsCount,
			takeCount: 10,
		};

		this._newsService
			.findNews(params)
			.pipe(
				tap((articlePreviews) => {
					this._totalCount = articlePreviews.totalCount ?? 0;
					this._newsCount += articlePreviews.body?.length ?? 0;
					return articlePreviews;
				}),
				switchMap((articlePreviews) => from(articlePreviews.body ?? [])),
				concatMap((articlePreview) => {
					return this._editorJSParser
						.parse(JSON.parse(articlePreview.preview ?? '[]'))
						.pipe(map((block) => ({ ...articlePreview, preview: block.join('') } as ArticlePreview)));
				}),
				toArray()
			)
			.subscribe((articlePreviews) => {
				this.articlePreviews = [...this.articlePreviews, ...articlePreviews];
				this._cdr.markForCheck();
			});
	}

	public onMenuOpen(event: any): void {
		event.stopPropagation();
	}

	public onNewsDelete(newsId: string | undefined): void {
		const confirmDialogData: ConfirmDialogModel = {
			title: 'Удаление новости',
			message: 'Вы действительно хотите удалить новость? Отменить данное действие будет невозможно.',
			confirmText: 'Да, удалить',
		};
		this._modalService
			.confirm(confirmDialogData)
			.afterClosed()
			.pipe(
				switchMap((isDeleted) => {
					if (isDeleted) {
						return this._newsService.disableNews(newsId ?? '');
					}
					return EMPTY;
				})
			)
			.subscribe((result) => {
				if (result.status === 'FullSuccess') {
					this.articlePreviews = this.articlePreviews.filter(
						(articlePreview) => articlePreview.id !== newsId
					);
				}
			});
	}

	public openPost(postId: string | undefined): void {
		this._modalService
			.fullScreen(PostComponent, postId)
			.afterClosed()
			.subscribe((newsId: string | undefined) => {
				if (newsId) {
					this.articlePreviews = this.articlePreviews.filter(
						(articlePreview) => articlePreview.id !== newsId
					);
				}
			});
	}

	public openEditor(newsId?: string): void {
		this._modalService
			.fullScreen(NewsEditorComponent, newsId)
			.afterClosed()
			.subscribe({
				next: (isNewsCreated) => {
					if (isNewsCreated) {
						this.articlePreviews = [];
						this._newsCount = 0;
						this._getArticlePreviews();
					}
				},
			});
	}
}
